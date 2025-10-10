class InputValidationException extends Error {
    constructor(message) {
        super(message);
        this.message = message || 'Input validation failed';
    }
}

export default InputValidationException;