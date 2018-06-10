import {Converter} from './Converter'

export function registerConverters(
    converter: Converter
) {

    // Global

    converter.registerConverter(
        'default_to',
        (val, {value}) => (val === null || val === undefined) ? value: val
    )

    // Numbers

    converter.registerConverter(
        'round',
        (value) => Math.round(value as number)
    )

    converter.registerConverter(
        'floor',
        (value) => Math.floor(value as number)
    )

    converter.registerConverter(
        'ceil',
        (value) => Math.ceil(value as number)
    )

    // Strings

    converter.registerConverter(
        'lower_case',
        (value) => (value as string).toLowerCase()
    )

    converter.registerConverter(
        'upper_case',
        (value) => (value as string).toUpperCase()
    )

    converter.registerConverter(
        'trim',
        (value) => (value as string).trim()
    )

    converter.registerConverter(
        'replace',
        (value, {pattern, replacement}) => (value as string).replace(pattern, replacement)
    )

    converter.registerConverter(
        'encode_url',
        (value) => encodeURI(value as string)
    )

    converter.registerConverter(
        'encode_url_component',
        (value) => encodeURIComponent(value as string)
    )

    converter.registerConverter(
        'decode_url',
        (value) => decodeURI(value as string)
    )

    converter.registerConverter(
        'decode_url_component',
        (value) => decodeURIComponent(value as string)
    )

    // Arrays

    converter.registerConverter(
        'sort',
        (value, {reverse}) => reverse ? (value as any[]).sort().reverse: (value as any[]).sort()
    )

    converter.registerConverter(
        'reverse',
        (value) => (value as any[]).reverse()
    )

}
