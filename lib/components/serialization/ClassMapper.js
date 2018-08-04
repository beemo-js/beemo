"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Normalizer_1 = require("./Normalizer");
var ClassMapper = /** @class */ (function () {
    function ClassMapper(normalizer) {
        this.normalizer = normalizer;
    }
    ClassMapper.prototype.map = function (value, fromClass, toClass, group) {
        if (group === void 0) { group = Normalizer_1.Normalizer.defaultGroup; }
        var normalized = this.normalizer.normalize(fromClass, value, group);
        var denormalized = this.normalizer.denormalize(toClass, normalized, group);
        return denormalized;
    };
    return ClassMapper;
}());
exports.ClassMapper = ClassMapper;
