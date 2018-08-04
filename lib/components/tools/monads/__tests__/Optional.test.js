"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Optional_1 = require("../Optional");
test('Optional should use given value if not null', function () {
    expect(Optional_1.Optional.of('hello')
        .map(function (val) { return val.toUpperCase(); })
        .getOrDefault('hola')).toBe('HELLO');
});
test('Optional should use default value if given value is null', function () {
    expect(Optional_1.Optional.of(null)
        .map(function (val) { return val.toUpperCase(); })
        .getOrDefault('HOLA')).toBe('HOLA');
});
