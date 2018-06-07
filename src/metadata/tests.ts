import {NameResolver} from './NameResolver'

class User {
    constructor(
        private foo: string
    ) {}
}

namespace TestNamespace {
    export class TestUser {}
}

// Name resolver

const nameResolver = new NameResolver({ User })
nameResolver.registerNamespaces({ TestNamespace })

console.log(nameResolver.findName(User))
console.log(nameResolver.findName(TestNamespace.TestUser))

console.log(nameResolver.resolveName('User'))
console.log(nameResolver.resolveName('TestNamespace.TestUser'))
