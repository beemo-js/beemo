import {Converter} from './Converter'

// 'camelCase' => ['camel', 'case']
// function splitVariableName(varName: string) {
//     return ['-', '_'].map(i => varName.split(i)).find(i => i.length > 1) // kebab-case / snake_case
//         || varName.replace(/([a-z](?=[A-Z]))/g, '$1-').toLowerCase().split('-') // PascalCase / camelCase
// }

export function registerConverters(
    converter: Converter
) {

    converter.registerConverter(
        'sorted',
        (value, _) => value.sort()
    )

}
