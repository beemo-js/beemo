var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class InMemoryKVStore {
    constructor() {
        this.store = new Map();
    }
    all() {
        const result = Array.from(this.store).map(i => i[1]);
        return Promise.all(result);
    }
    get(key) {
        return this.store.get(key);
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.store.set(key, value);
            return true;
        });
    }
    has(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.has(key);
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.store.delete(key);
            return true;
        });
    }
}
