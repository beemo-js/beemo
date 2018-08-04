"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function registerConverters(converter) {
    // Global
    converter.registerConverter('default_to', function (val, _a) {
        var value = _a.value;
        return (val === null || val === undefined) ? value : val;
    });
    // Numbers
    converter.registerConverter('round', function (value) { return Math.round(value); });
    converter.registerConverter('floor', function (value) { return Math.floor(value); });
    converter.registerConverter('ceil', function (value) { return Math.ceil(value); });
    // Strings
    converter.registerConverter('lower_case', function (value) { return value.toLowerCase(); });
    converter.registerConverter('upper_case', function (value) { return value.toUpperCase(); });
    converter.registerConverter('trim', function (value) { return value.trim(); });
    converter.registerConverter('replace', function (value, _a) {
        var pattern = _a.pattern, replacement = _a.replacement;
        return value.replace(pattern, replacement);
    });
    converter.registerConverter('encode_url', function (value) { return encodeURI(value); });
    converter.registerConverter('encode_url_component', function (value) { return encodeURIComponent(value); });
    converter.registerConverter('decode_url', function (value) { return decodeURI(value); });
    converter.registerConverter('decode_url_component', function (value) { return decodeURIComponent(value); });
    // Arrays
    converter.registerConverter('sort', function (value, _a) {
        var reverse = _a.reverse;
        return reverse ? value.sort().reverse : value.sort();
    });
    converter.registerConverter('reverse', function (value) { return value.reverse(); });
}
exports.registerConverters = registerConverters;
