import NotFoundException from '../exception/notFoundExeption.js';
import DuplicateEntryException from '../exception/duplicateEntryException.js';

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(`Error:\n ${err.message}\n Stack: ${err.stack}`);

    switch (true) {
        case err instanceof NotFoundException:
            res.status(404).json({
                status: 'error',
                message: err.message
            });
            break;

        case err instanceof DuplicateEntryException:
            res.status(409).json({
                status: 'error',
                message: err.message
            });
            break;

        default:
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                error: err.message || 'An unexpected error occurred'
            });
            break;
    }
}

export default errorHandlerMiddleware;