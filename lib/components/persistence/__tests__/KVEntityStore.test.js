var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initContainer } from '../../../framework/initContainer';
import { MappedField } from '../../serialization/annotations/annotations';
import { KVEntityStore } from '../entity/KVEntityStore';
import { InMemoryKVStore } from '../kvstore/InMemoryKVStore';
import { container } from '../../../framework/globalContainer';
import { SerializationServiceName } from '../../../framework/services';
initContainer();
test('KVEntityStore', () => __awaiter(this, void 0, void 0, function* () {
    class User {
    }
    __decorate([
        MappedField(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        MappedField(),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    class UserStore extends KVEntityStore {
        constructor(kvStore, normalizer) {
            super(kvStore, normalizer, User, 'User');
        }
    }
    const kvStore = new InMemoryKVStore();
    const normalizer = container.get(SerializationServiceName.Normalizer);
    const userStore = new UserStore(kvStore, normalizer);
    const user = new User();
    user.id = 2;
    user.name = 'test-user';
    yield userStore.save(user);
    const foundUser = yield userStore.findById(2);
    expect(foundUser.id).toBe(2);
    expect(foundUser.name).toBe('test-user');
    expect(yield userStore.all()).toContainEqual(user);
}));
