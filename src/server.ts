import express from 'express'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'

import user from './routes/user'
import push from './routes/push'
import authenticate from './middleware/authorizer'

const app = express()

app.use(express.static('./'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(authenticate())
app.use(fileUpload())

app.use('/api/user', user)
app.use('/api/push', push)

app.listen(2048, () => console.log('Running on localhost:2048'))