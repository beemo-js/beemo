import { ConverterData } from '../types';
/**
 * Returns a converter annotation.
 */
export declare const Convert: (data: ConverterData) => (target: any, key: string, index?: number) => void;
export declare const DefaultTo: (value: any) => (target: any, key: string, index?: number) => void;
export declare const Round: () => (target: any, key: string, index?: number) => void;
export declare const Floor: () => (target: any, key: string, index?: number) => void;
export declare const Ceil: () => (target: any, key: string, index?: number) => void;
export declare const LowerCase: () => (target: any, key: string, index?: number) => void;
export declare const UpperCase: () => (target: any, key: string, index?: number) => void;
export declare const Trim: () => (target: any, key: string, index?: number) => void;
export declare const Replace: (pattern: string | RegExp, replacement: string) => (target: any, key: string, index?: number) => void;
export declare const UrlEncode: () => (target: any, key: string, index?: number) => void;
export declare const UrlEncodeComponent: () => (target: any, key: string, index?: number) => void;
export declare const UrlDecode: () => (target: any, key: string, index?: number) => void;
export declare const UrlDecodeComponent: () => (target: any, key: string, index?: number) => void;
export declare const Sort: (reverse?: boolean) => (target: any, key: string, index?: number) => void;
export declare const Reverse: () => (target: any, key: string, index?: number) => void;
