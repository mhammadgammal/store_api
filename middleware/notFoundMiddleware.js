import NotFoundException from '../exception/notFoundExeption.js'

const notFound = (_, __) => { throw new NotFoundException('Route not found') }

export default notFound
