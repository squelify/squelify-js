import type { ConsolaInstance, LogType } from 'consola'
import { LogLevels, createConsola } from 'consola/basic'
import type { $Fetch, Fetch } from 'ofetch'
import { FetchError, fetch, ofetch } from 'ofetch'
import { isProduction } from 'std-env'

import { AuthService } from './services/auth.service'

export interface SquelifyOptions {
  /** Base URL for API requests */
  apiUrl: string
  /** Custom headers for all requests */
  headers?: { [key: string]: string }
  /** Enable debug mode or provide a custom logging function */
  logLevel?: LogType
  /** Custom fetch function */
  fetcher?: Fetch
}

const HTTPRegexp = /^http:\/\//
const isBrowser = () => typeof document !== 'undefined'

const DEFAULT_OPTIONS: Pick<Required<SquelifyOptions>, 'logLevel'> = {
  logLevel: 'debug',
}

export default class Squelify {
  private static instance: Squelify
  private static nextInstanceID = 0
  protected static logTag = 'Squelify'

  private instanceID: number
  private fetcher: $Fetch

  protected apiUrl: string
  protected logLevel: LogType
  protected logger: ConsolaInstance

  protected headers: {
    [key: string]: string
  }

  auth: AuthService

  constructor(options: SquelifyOptions) {
    this.instanceID = Squelify.nextInstanceID
    Squelify.nextInstanceID += 1

    /**
     * Initializes the some properties of the `Squelify` class with a default value.
     * The `DEFAULT_OPTIONS` object is merged with the provided `options` object,
     * and the resulting object is used to configure the `Squelify` instance.
     */
    const opts = { ...DEFAULT_OPTIONS, ...options }

    // By default, in DEV mode we log all requests and responses.
    // This setting can be overridden via the `logLevel` option.
    this.logLevel = options.logLevel ?? opts.logLevel
    this.logger = createConsola({ level: LogLevels[this.logLevel] })

    if (this.instanceID > 0 && isBrowser()) {
      this.logger
        .withTag(Squelify.logTag)
        .warn(
          'Multiple Squelify instances detected in the same browser context.',
          'It may produce undefined behavior when used concurrently under the same storage key.'
        )
    }

    this.apiUrl = opts.apiUrl ?? ''
    this.headers = opts.headers || {}
    this.fetcher = this._createFetcher(opts.fetcher)

    // Initialize service constructors
    this.auth = new AuthService(this)

    if (isProduction && HTTPRegexp.test(this.apiUrl)) {
      this.logger
        .withTag(Squelify.logTag)
        .warn('NEVER USE HTTP IN PRODUCTION. Always use HTTPS for secure operations.')
    }
  }

  static getInstance(options?: SquelifyOptions): Squelify {
    if (!Squelify.instance) {
      Squelify.instance = new Squelify(options || { apiUrl: '' })
    }
    return Squelify.instance
  }

  private _createFetcher(customFetch?: Fetch): $Fetch {
    const logger = this.logger.withTag(Squelify.logTag)
    return ofetch.create(
      {
        baseURL: this.apiUrl,
        onRequest(ctx) {
          // Do something before request is sent.
          logger.withTag('onRequest').debug(ctx.request)
        },
        onResponse(ctx) {
          // Do something after response is received.
          logger.withTag('onResponse').debug(ctx.response)
        },
        onRequestError(ctx) {
          // Do something before request is sent.
          logger.withTag('onRequestError').error(ctx.error)
        },
        onResponseError(ctx) {
          // Do something after response is received.
          logger.withTag('onResponseError').error(ctx.error)
        },
      },
      { fetch: customFetch || fetch }
    )
  }

  async _request<T>(path: string, options?: RequestInit): Promise<T> {
    const headers: HeadersInit = new Headers(options?.headers)

    // Set default request headers
    if (!headers.has('Accept')) {
      headers.append('Accept', 'application/json')
    }

    if (!headers.has('Content-Type')) {
      headers.append('Content-Type', 'application/json')
    }

    try {
      return await this.fetcher<T>(path, { ...options, headers })
    } catch (error) {
      if (error instanceof FetchError && error.data) {
        if (error.data.error) {
          error.message = error.data.error.message
        }
      }
      throw error
    }
  }

  _healthCheck(): Promise<string> {
    return this._request<string>('/healthz')
  }
}
