"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Normalizer_1 = require("../Normalizer");
var ComposableSerializer = /** @class */ (function () {
    function ComposableSerializer(normalizer, encoder) {
        this.normalizer = normalizer;
        this.encoder = encoder;
    }
    ComposableSerializer.prototype.deserialize = function (classFn, text, group) {
        if (group === void 0) { group = Normalizer_1.Normalizer.defaultGroup; }
        return this.normalizer.denormalize(classFn, this.encoder.decode(text), group);
    };
    ComposableSerializer.prototype.serialize = function (classFn, data, group) {
        if (group === void 0) { group = Normalizer_1.Normalizer.defaultGroup; }
        return this.encoder.encode(this.normalizer.normalize(classFn, data, group));
    };
    return ComposableSerializer;
}());
exports.ComposableSerializer = ComposableSerializer;
