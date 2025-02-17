# Squelify JavaScript SDK

[![Contribution](https://badgen.net/badge/icon/Contributions%20Welcome?icon=bitcoin-lightning&label&color=black&labelColor=black)][contribution]

This is the official JavaScript client library designed to interact with the [Squelify API](https://squelify.com/docs).

## Installation

```sh
# Install with npm
npm install @squelify/client

# Install with yarn
yarn add @squelify/client

# Install with pnpm
pnpm install @squelify/client
```

## Usage

```ts
import Squelify from "@squelify/client";

// Instantiate the Squelify client with an optional configuration
const sq = new Squelify({
  apiUrl: "https://<your_squelify_domain_name>"
});
```

## License

This project is open-sourced software licensed under the [MIT license][license-mit].

Copyrights in this project are retained by their contributors.
See the [license file](./LICENSE) for more information.

---

<sub>🤫 Psst! If you like our work you can support us via [GitHub sponsors][github-sponsors] or by subscribing on Polar.</sub>

<a href="https://polar.sh/squelify" target="_blank" rel="noopener noreferrer">
  <picture>
    <source media="(prefers-color-scheme: dark)"
      srcset="https://polar.sh/embed/subscribe.svg?org=squelify&label=Subscribe&darkmode"><img
      alt="Subscribe on Polar" src="https://polar.sh/embed/subscribe.svg?org=squelify&label=Subscribe">
  </picture>
</a>

<!-- link reference definition -->
[contribution]: https://github.com/squelify/squelify/pulse
[github-sponsors]: https://github.com/sponsors/squelify
[license-mit]: https://choosealicense.com/licenses/mit/
