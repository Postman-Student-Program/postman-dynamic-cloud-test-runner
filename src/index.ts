import express from 'express'
import { validator } from './middleware/validator'
import { handleErrors } from './middleware/handleErrors'
import { asyncHandler } from './middleware/asyncHandler'

import { routes } from './routes'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(validator)

app.get('/', routes.getStatus)

app.post('/check', asyncHandler(routes.postCheck))

app.use(handleErrors)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
