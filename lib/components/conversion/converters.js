export function registerConverters(converter) {
    // Global
    converter.registerConverter('default_to', (val, { value }) => (val === null || val === undefined) ? value : val);
    // Numbers
    converter.registerConverter('round', (value) => Math.round(value));
    converter.registerConverter('floor', (value) => Math.floor(value));
    converter.registerConverter('ceil', (value) => Math.ceil(value));
    // Strings
    converter.registerConverter('lower_case', (value) => value.toLowerCase());
    converter.registerConverter('upper_case', (value) => value.toUpperCase());
    converter.registerConverter('trim', (value) => value.trim());
    converter.registerConverter('replace', (value, { pattern, replacement }) => value.replace(pattern, replacement));
    converter.registerConverter('encode_url', (value) => encodeURI(value));
    converter.registerConverter('encode_url_component', (value) => encodeURIComponent(value));
    converter.registerConverter('decode_url', (value) => decodeURI(value));
    converter.registerConverter('decode_url_component', (value) => decodeURIComponent(value));
    // Arrays
    converter.registerConverter('sort', (value, { reverse }) => reverse ? value.sort().reverse : value.sort());
    converter.registerConverter('reverse', (value) => value.reverse());
}
