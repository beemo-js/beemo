# Dependency Injection

This module eases the integration of the Dependency Injection pattern into your project.

Here is a simple example:

```ts
@Service()
class InjectedService {}

@Service()
class ServiceWithDependencies {
    constructor(
        private injectedService: InjectedService
    ) {}
}

// Get ServiceWithDependencies from the container
container.get<ServiceWithDependencies>(ServiceWithDependencies)
```

In this example, we declared `InjectedService` and `ServiceWithDependencies` as services.
This means they are registered in the DI container.
As `ServiceWithDependencies` needs an instance of `InjectedService` in its constructor, Beemo will inject it when getting it from the global container.

## Use without typing

In the example above, Beemo knows the dependencies of `ServiceWithDependencies` thanks to the types declared in the constructor.
If you are not developing in Typescript you don't have access to types, but you can indicate to Beemo what you want to be injected thanks to the `@Inject` annotation.

```ts
@Service()
class InjectedService {}

@Service()
class ServiceWithDependencies {
    constructor(
        @Inject(InjectedService) private injectedService
    ) {}
}
```

`@Inject` takes as parameter the identifier of the service to inject. It can be its constructor, or its name if it has been defined using it (see below).

## Named services

Services can be named. Most of the time it is not necessary, but you can find yourself needing it sometimes, for example when defining a service as an interface.

In the example below, `ServiceWithDependencies` requires an `InjectedServiceInterface`, implemented by `InjectedService`

```ts
interface InjectedServiceInterface {}

@Service('injected-service')
class InjectedService implements InjectedServiceInterface {}

@Service()
class ServiceWithDependencies {
    constructor(
        @Inject('injected-service') private injectedService: InjectedServiceInterface
    ) {}
}
```

## Inject values from configuration

Values can also be retrieved from [configuration](./configuration) using the `@FromConfig` annotation.

```ts
// Configuration definition
const configuration = new InMemoryConfigurationStore({
    a: {
        b: 'c'
    }
})

@Service()
class ServiceWithDependencies {
    constructor(
        @FromConfig('a.b') private valueFromConfig // <- 'c'
    ) {}
}
```

## Manually bind class to container

If provided annotations are not enough for some of your use cases, you can still define how to instantiate services manually.

  ```ts
container.set(InjectedService, () => new InjectedService())

@Service()
class ServiceWithDependencies {
    constructor(
        private injectedService: InjectedService
    ) {}
}
```
