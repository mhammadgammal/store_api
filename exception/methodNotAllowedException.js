class MethodNotAllowedException extends Error {
    constructor(message) {
        super(message);
        this.message = message || 'Method Not Allowed';
    }
}

export default MethodNotAllowedException;