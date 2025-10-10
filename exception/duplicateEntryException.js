class DuplicateEntryException extends Error {
    constructor(message) {
        super(message);
        this.message = message || 'Duplicate entry found';
    }
}

export default DuplicateEntryException;