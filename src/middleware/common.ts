import { Router } from "express";
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'

export const bodyParserMiddleware = (app: Router) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
}

export const fileUploadMiddleware = (app: Router) => {
    app.use(fileUpload())
}