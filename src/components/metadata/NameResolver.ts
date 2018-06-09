
export class NameResolver {

    constructor(
        // default namespace (e.g. the window object)
        private globalNamespace: Object,
        private namespaces: Object = {}
    ) {}

    registerNamespaces(namespaces: Object): void {
        for (let i in namespaces) {
            this.namespaces[i] = namespaces[i]
        }
    }

    // Find name of target class / anything
    findName(target: any): string|null {
        let name = this.findNameInNamespace(target, this.namespaces)
        if (!!name) {
            // remove leading dot
            name = name.substr(1)
        } else {
            name = this.getLocalName(target)
        }
        return name
    }

    // get object related to name
    resolveName(name: string): any {
        const path = name.split('.')

        // in global namespace
        if (path.length === 1) {
            return this.globalNamespace[path[0]]
        }

        // in a namespace
        let result = this.namespaces
        path.forEach(i => { result = result[i] })
        return result
    }

    // DFS search in namespace
    private findNameInNamespace(target: any, ns: Object, pathBase: string = ''): string|null {
        for (let i in ns) {
            // if found, return path
            if (ns[i] === target) {
                return pathBase + '.' + i
            }
            // if namespace, search in it
            if (typeof (ns[i]) === 'object') {
                let name = this.findNameInNamespace(target, ns[i], pathBase + '.' + i)
                if (!!name) {
                    return name
                }
            }
        }
        return null
    }

    // get name of target
    private getLocalName(target: any): string|null {
        if (target.name) return target.name
        if (target.constructor) return target.constructor.name

        let name = null
        if (target.prototype.constructor) {
            name = target.prototype.constructor.name
        } else {
            const found = /^function\s+([\w\$]+)\s*\(/.exec(target.toString())
            name = found ? found[1]: null
        }

        if (!!name && !!target.constructor) {
            target.constructor.name = name
        }

        return name
    }
}
