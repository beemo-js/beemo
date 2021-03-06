import { ValidatorData } from '../types';
export declare const Constraints: (data: ValidatorData) => (target: any, key: string, index?: number) => void;
export declare const Typed: (type: Function) => (target: any, key: string, index?: number) => void;
export declare const NotNull: () => (target: any, key: string, index?: number) => void;
export declare const Min: (lowerBound: number) => (target: any, key: string, index?: number) => void;
export declare const Max: (upperBound: number) => (target: any, key: string, index?: number) => void;
export declare const Between: (lowerBound: number, upperBound: number) => (target: any, key: string, index?: number) => void;
export declare const Positive: () => (target: any, key: string, index?: number) => void;
export declare const PositiveOrZero: () => (target: any, key: string, index?: number) => void;
export declare const Negative: () => (target: any, key: string, index?: number) => void;
export declare const NegativeOrZero: () => (target: any, key: string, index?: number) => void;
export declare const Pattern: (p: string | RegExp) => (target: any, key: string, index?: number) => void;
export declare const Email: () => (target: any, key: string, index?: number) => void;
export declare const Url: () => (target: any, key: string, index?: number) => void;
export declare const NotEmpty: () => (target: any, key: string, index?: number) => void;
export declare const Length: (l: number) => (target: any, key: string, index?: number) => void;
export declare const MinLength: (length: number) => (target: any, key: string, index?: number) => void;
export declare const MaxLength: (length: number) => (target: any, key: string, index?: number) => void;
export declare const LengthBetween: (minLength: number, maxLength: number) => (target: any, key: string, index?: number) => void;
export declare const Past: (from?: Date) => (target: any, key: string, index?: number) => void;
export declare const Future: (from?: Date) => (target: any, key: string, index?: number) => void;
export declare const Valid: (classFn: Function) => (target: any, key: string, index?: number) => void;
