"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enity store implementation using a KV store.
 */
var KVEntityStore = /** @class */ (function () {
    function KVEntityStore(kvStore, normalizer, entityClass, basePath, idToStringMapper, pathSeparator, normalizationGroup) {
        if (idToStringMapper === void 0) { idToStringMapper = function (id) { return id.toString(); }; }
        if (pathSeparator === void 0) { pathSeparator = ':'; }
        if (normalizationGroup === void 0) { normalizationGroup = 'storage'; }
        this.kvStore = kvStore;
        this.normalizer = normalizer;
        this.entityClass = entityClass;
        this.basePath = basePath;
        this.idToStringMapper = idToStringMapper;
        this.pathSeparator = pathSeparator;
        this.normalizationGroup = normalizationGroup;
    }
    KVEntityStore.prototype.entityPath = function (id) {
        return this.basePath + this.pathSeparator + this.idToStringMapper(id);
    };
    KVEntityStore.prototype.all = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.kvStore.all()];
                    case 1: return [2 /*return*/, (_a.sent())
                            .map(function (item) { return _this.normalizer.denormalize(_this.entityClass, item, _this.normalizationGroup); })];
                }
            });
        });
    };
    KVEntityStore.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var foundData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.kvStore.get(this.entityPath(id))];
                    case 1:
                        foundData = _a.sent();
                        return [2 /*return*/, this.normalizer.denormalize(this.entityClass, foundData, this.normalizationGroup)];
                }
            });
        });
    };
    KVEntityStore.prototype.save = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(entity)) return [3 /*break*/, 2];
                        return [4 /*yield*/, entity.forEach(function (e) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.save(e)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2: return [2 /*return*/, this.kvStore.set(this.entityPath(entity.id), this.normalizer.normalizeInstance(entity, this.normalizationGroup))];
                }
            });
        });
    };
    KVEntityStore.prototype.existsById = function (id) {
        return this.kvStore.has(this.entityPath(id));
    };
    KVEntityStore.prototype.deleteById = function (id) {
        return this.kvStore.delete(this.entityPath(id));
    };
    return KVEntityStore;
}());
exports.KVEntityStore = KVEntityStore;
