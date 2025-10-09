class NotFoundException extends Error {
    constructor(message) {
        super(message);
        this.message = message || 'not found';
    }
}

export default NotFoundException;