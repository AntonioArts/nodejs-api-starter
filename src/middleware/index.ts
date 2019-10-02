import {
    bodyParserMiddleware,
    fileUploadMiddleware
} from './common'

import {
    authorizerMiddleware
} from './authorizer'

export default [
    bodyParserMiddleware,
    fileUploadMiddleware,    
    authorizerMiddleware
]