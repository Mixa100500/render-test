const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const errorHandler = (error, request, respose, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return respose.status(400).send({ eror: 'malfomatted id' })
  } else if (error.name === 'ValidationError') {
    return respose.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}