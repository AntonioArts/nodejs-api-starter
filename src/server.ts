import express from 'express'
import middleware from './middleware'
import routes from './resources'
import { applyMiddleware, applyRoutes } from './utils'

const app = express()
app.use(express.static('./'))

applyMiddleware(middleware, app)
applyRoutes(routes, app)

app.listen(2048, () => console.log('Running on localhost:2048'))