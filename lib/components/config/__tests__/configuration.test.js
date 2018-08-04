"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
test('StackableConfiguration', function () {
    var config = new __1.InMemoryConfigurationStore({
        a: {
            b: 'c'
        },
        d: 'e'
    });
    expect(config.get('a.b')).toBe('c');
    expect(config.get('c.c')).toBe(undefined);
    config.set('a.f', 'g');
    expect(config.get('a.f')).toBe('g');
});
