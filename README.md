# <p align="middle"><img src="assets/logo.png" width="400px" alt="Beemo" /></p>

[![License](https://img.shields.io/badge/License-Apache%202.0-3fe0d0.svg?longCache=true&style=flat-square)](https://opensource.org/licenses/Apache-2.0)

Beemo is a library for Typescript and Javascript which main goal is to help building frontend applications using a clean architecture and development best practices, with inspiration from various sources like Android and iOS development, Angular, Spring, Symfony...

Although the focus is on frontend development, Beemo's components can also be used in Node servers development.

Here are the main features and goals of Beemo:

- **Complementary to React / Redux / Vue...**: Beemo doesn't reimplement what these standard libraries already do well; instead, it adds features they miss to be considered as full frameworks.
- **Helps writing more readable code**: with the help of some decorators, monads and other helpers, most code boilerplate can be reduced and make your code easier to understand
- **Platform agnostic**: Rely on platform-independent abstractions through interfaces, Beemo provides implementation of them for each supported platform, and you can add more platform integrations easily
- **Use powerful patterns to fasten your app**: For example, requests can be pushed to a queue to be sent asynchronously during idle time or in a dedicated thread, and handle network failures using a circuit breaker
- **Helps building apps with a clean architecture**: Beemo makes architectural patterns like Dependency Injection or Event Driven Architecture easier to use
- **Lightweight**: the full bundle weights ~15kb minimized and gzipped, and this size can be further reduced thanks to the modularity of Beemo's components and tree shaking

Note that this is a work in progress, and not ready for prod.

## Install

First you need to install Beemo's core lib:

```bash
npm install beemo-lib --save
```

Then install the integration for the platforms you need. Currently only the web platform is supported.

For example, for web:

```bash
npm install beemo-web --save
```

## How to use

Make sure to call the initializer function for your platform before using Beemo.
For example, in the web platform you must add the following line:

```ts
initBeemoForWeb()
```

This will create the global Dependency Injection container and fill with its services, and register integrated converters and validators.

Then you can use Beemo's features, described in the following section by component.

## Integration

The following platforms are supported:

- [Web](https://github.com/beemo-js/integration-web)
- [Node](https://github.com/beemo-js/integration-node)

Integrating Beemo to a platform is quite simple, it mainly consists in adding missing implementation of some interfaces for the platform and add them into the global container.

## Per-component documentation

- [Annotations](./docs/annotations.md)
- [Configuration](./docs/config.md)
- [Dependency Injection](./docs/di.md)
- [Conversion](./docs/conversion.md)
- [Validation](./docs/validation.md)
- [Serialization](./docs/serialization.md)
- [Persistence](./docs/persistence.md)
- [HTTP](./docs/http.md)
- [Logging](./docs/logging.md)
- [Events](./docs/events.md)
- [Threads](./docs/threads.md)
- [Tools](./docs/tools.md)
