import NotFoundException from '../exception/notFoundExeption.js'

const routeNotFound = (req, res, next) => { throw new NotFoundException(`Route not found: ${req.originalUrl}`) }

export default routeNotFound;
