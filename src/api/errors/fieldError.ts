export class FieldsError extends Error {
    constructor(public errors: { [field: string]: string[] }) {
        super(
            Object.entries(errors)
                .map(([_, error]) => `${error.join(',')}`)
                .join('\n')
        );
    }
}
