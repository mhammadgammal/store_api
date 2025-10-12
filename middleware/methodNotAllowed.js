import MethodNotAllowedException from '../exception/methodNotAllowedException.js';
const methodNotAllowed =
    (req, res, next) => {
        throw new MethodNotAllowedException(`Method ${req.method} not allowed`);
    };
export default methodNotAllowed;