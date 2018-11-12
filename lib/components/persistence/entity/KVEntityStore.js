var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Enity store implementation using a KV store.
 */
export class KVEntityStore {
    constructor(kvStore, normalizer, entityClass, basePath, idToStringMapper = id => id.toString(), pathSeparator = ':', normalizationGroup = 'storage') {
        this.kvStore = kvStore;
        this.normalizer = normalizer;
        this.entityClass = entityClass;
        this.basePath = basePath;
        this.idToStringMapper = idToStringMapper;
        this.pathSeparator = pathSeparator;
        this.normalizationGroup = normalizationGroup;
    }
    entityPath(id) {
        return this.basePath + this.pathSeparator + this.idToStringMapper(id);
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.kvStore.all())
                .map(item => this.normalizer.denormalize(this.entityClass, item, this.normalizationGroup));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundData = yield this.kvStore.get(this.entityPath(id));
            return this.normalizer.denormalize(this.entityClass, foundData, this.normalizationGroup);
        });
    }
    save(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(entity)) {
                yield entity.forEach((e) => __awaiter(this, void 0, void 0, function* () { return yield this.save(e); }));
                return true;
            }
            return this.kvStore.set(this.entityPath(entity.id), this.normalizer.normalizeInstance(entity, this.normalizationGroup));
        });
    }
    existsById(id) {
        return this.kvStore.has(this.entityPath(id));
    }
    deleteById(id) {
        return this.kvStore.delete(this.entityPath(id));
    }
}
