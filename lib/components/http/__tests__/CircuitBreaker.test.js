"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
test('Circuit Breaker', function () {
    var circuitBreaker = new __1.CircuitBreaker(2, 2, 500);
    try {
        circuitBreaker.attempt(function () { throw 'ok'; });
    }
    catch (e) {
        expect(e).toBe('ok');
    }
    try {
        circuitBreaker.attempt(function () { throw 'ok'; });
    }
    catch (e) {
        expect(e).toBe('ok');
    }
    try {
        circuitBreaker.attempt(function () { throw 'ok'; });
    }
    catch (e) {
        expect(e).not.toBe('ok');
    }
    try {
        circuitBreaker.attempt(function () { throw 'ok'; });
    }
    catch (e) {
        expect(e).not.toBe('ok');
    }
    setTimeout(function () {
        console.log('After 1 second');
        try {
            circuitBreaker.attempt(function () { throw 'ok'; });
        }
        catch (e) {
            expect(e).toBe('ok');
        }
        try {
            circuitBreaker.attempt(function () { throw 'ok'; });
        }
        catch (e) {
            expect(e).not.toBe('ok');
        }
    }, 1000);
    setTimeout(function () {
        console.log('After 2 seconds');
        circuitBreaker.attempt(function () { console.log('no exception'); });
        circuitBreaker.attempt(function () { console.log('no exception'); });
        circuitBreaker.attempt(function () { console.log('no exception'); });
        try {
            circuitBreaker.attempt(function () { throw 'ok'; });
        }
        catch (e) {
            expect(e).toBe('ok');
        }
        try {
            circuitBreaker.attempt(function () { throw 'ok'; });
        }
        catch (e) {
            expect(e).toBe('ok');
        }
    }, 2000);
});
