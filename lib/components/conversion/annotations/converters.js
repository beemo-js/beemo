import { ceil, defaultTo, floor, lowerCase, replace, reverse, round, sort, trim, upperCase, encodeUrl, encodeUrlComponent, decodeUrlComponent, decodeUrl } from '../builders';
import { container } from '../../../framework/globalContainer';
import { AnnotationsServiceName } from '../../../framework/services';
/**
 * Returns a converter annotation.
 */
export const Convert = (data) => (target, key, index) => {
    const classAnnotationsStore = container.get(AnnotationsServiceName.ClassAnnotationsStore);
    if (index === undefined) {
        // property
        classAnnotationsStore.addPropertyAnnotation(target.constructor, key, Convert, data);
    }
    else {
        // method parameter
        classAnnotationsStore.addMethodParameterAnnotation(target.constructor, key, index, Convert, data);
    }
};
// Global
export const DefaultTo = (value) => Convert(defaultTo(value));
// Numbers
export const Round = () => Convert(round());
export const Floor = () => Convert(floor());
export const Ceil = () => Convert(ceil());
// Strings
export const LowerCase = () => Convert(lowerCase());
export const UpperCase = () => Convert(upperCase());
export const Trim = () => Convert(trim());
export const Replace = (pattern, replacement) => Convert(replace(pattern, replacement));
export const UrlEncode = () => Convert(encodeUrl());
export const UrlEncodeComponent = () => Convert(encodeUrlComponent());
export const UrlDecode = () => Convert(decodeUrl());
export const UrlDecodeComponent = () => Convert(decodeUrlComponent());
// Arrays
export const Sort = (reverse = false) => Convert(sort(reverse));
export const Reverse = () => Convert(reverse());
