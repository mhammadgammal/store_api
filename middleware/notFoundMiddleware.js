const notFound = (req, res) => { throw new NotFoundException('Route not found') }

module.exports = notFound
