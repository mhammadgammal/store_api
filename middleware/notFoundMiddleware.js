const NotFoundException = require('../exception/notFoundExeption')
const notFound = (_, __) => { throw new NotFoundException('Route not found') }

module.exports = notFound
