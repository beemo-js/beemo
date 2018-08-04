"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Attempt_1 = require("../Attempt");
test('Attempt should use given value if no exception was thrown', function () {
    expect(Attempt_1.Attempt.of(function () { return 'ok'; })
        .map(function (val) { return val.toUpperCase(); })
        .getOrDefault('not ok')).toBe('OK');
});
test('Attempt should use default value if an exception was thrown', function () {
    expect(Attempt_1.Attempt.of(function () { throw 'blablabla'; })
        .map(function (val) { return val.toUpperCase(); })
        .getOrDefault('NOT OK')).toBe('NOT OK');
});
