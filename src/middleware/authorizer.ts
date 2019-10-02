import { Router } from "express";
import jwt from 'jsonwebtoken';
import db from '../config/db';

import config from '../config';

export const authorizerMiddleware = (app: Router) => {
    app.use((() => {
        return (req: any, res: any, next: Function) => {
            if (config.privatePath.includes(req.path)) {                
                const authorizationHeader = req.headers['authorization'];
                let token;
                
                if (authorizationHeader) {
                    token = authorizationHeader.split(' ')[1];
                }
                
                if (token) {
                    jwt.verify(token, config.jwtSecret, (err: Error, decoded: any) => {
                        if (err) {
                            res.status(401).json({"error": "Failed to authenticate"})
                        } else {
                            db.query('SELECT id FROM user WHERE id = ?', [decoded.id], function (error, results, fields) {
                                if (error) throw error;
                                if (results[0]) {
                                    req.userId = results[0].id
                                    next()
                                } else {
                                    res.status(404).json({"error": "User or password do not exists"})
                                }
                            })
                        }
                    });
                } else {
                    res.status(403).json({"error": "Failed to authenticate"})
                }
            } else {
                next()
            }
        }
    })())
}