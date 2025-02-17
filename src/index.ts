/**
 * Squelify Client.

 * For local development, use `http://localhost:3278` as the base URL.
 *
 * @see https://squelify.com/docs/sdk
 *
 * ```ts
 * import Squelify from "@squelify/client";
 *
 * const sq = new Squelify({
 *   apiUrl: "https://<your_squelify_domain_name>/api",
 * });
 * ```
 */

export type { SquelifyOptions } from './client'
export { default as Squelify } from './client'
