# <p align="middle"><img src="assets/logo.png" width="400px" alt="Beemo" /></p>

**ABSOLUTELY NOT READY FOR PROD!**

This is a work in progress.

Beemo is a set of components and a framework for Typescript and Javascript. Its main goal is to help building frontend applications using a clean architecture and best practices with inspiration from various sources like Android (and Android Jetpack) and iOS development, Angular, Spring...

Although the focus is on frontend development, Beemo's components can also be used in Node servers development.

Here are the main features and goals of Beemo:

- **Lightweight**: the full bundle currently weights ~10kb minimized and gzipped, and this size can be further reduced thanks to the modularity of Beemo's components and tree shaking
- **Complementary to React / Redux / Vue...**: Beemo doesn't reimplement what these standard libraries already do well; instead, it adds features they miss to be considered as full frameworks. Dedicated support of React and React Native with Redux and MobX is planned to have a full framework ready out of the box
- **Helps writing more readable code**: with the help of some decorators, monads and other helpers, most code boilerplate can be reduced
- **Reuse as much code as possible between your target platforms**: Rely on platform-independent abstractions through interfaces, Beemo provides implementation of them for each targeted platform
- **Use powerful patterns to fasten your app**: For example, requests can be pushed to a queue to be sent during idle time or in a dedicated thread, or even be sent batched in a unique request to improve performance
- **Helps building apps with a clean architecture**: Beemo makes architectural patterns like Dependency Injection easy to use

## Per-module documentation

- [Annotations](./docs/annotations.md)
- [Cache](./docs/cache.md)
- [Configuration](./docs/config.md)
- [Conversion](./docs/conversion.md)
- [Dependency Injection](./docs/di.md)
- [Events](./docs/events.md)
- [HTTP](./docs/http.md)
- [Logging](./docs/logging.md)
- [Permissions](./docs/permissions.md)
- [Persistence](./docs/persistence.md)
- [Serialization](./docs/serialization.md)
- [Threads](./docs/threads.md)
- [Tools](./docs/tools.md)
- [Validation](./docs/validation.md)
