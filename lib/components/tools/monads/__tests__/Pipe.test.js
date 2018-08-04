"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pipe_1 = require("../Pipe");
test('Optional should use given value if not null', function () {
    expect(Pipe_1.Pipe.of('pipe')
        .map(function (val) { return val.toUpperCase(); })
        .get()).toBe('PIPE');
});
