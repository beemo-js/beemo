export type middlewareType = (next: (args: any[]) => any, args: any[]) => any

export interface AnnotationData {
    type: Function // Type of annotation
    data: Object // Annotation data
}