# Dependency Injection

## Simple example:

```ts
@Service()
class InjectedService {}

@Service()
class ServiceWithDependencies {
    constructor(
        private injectedService: InjectedService
    ) {}
}

container.get<ServiceWithDependencies>(ServiceWithDependencies)
```

## Without typing:

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

## Named services

```ts
@Service('service-name')
class InjectedService {}

@Service()
class ServiceWithDependencies {
    constructor(
        @Inject('service-name') private injectedService
    ) {}
}
```

## Inject values from configuration

```ts
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

  ```ts
container.set(InjectedService, () => new InjectedService())

@Service()
class ServiceWithDependencies {
    constructor(
        private injectedService: InjectedService
    ) {}
}
```

