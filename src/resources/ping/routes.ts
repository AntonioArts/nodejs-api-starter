import { Request, Response } from 'express';

import config from '../../config';

export default [
    {
        path: `${config.apiPrefix}/ping/public`,
        method: "post",
        handler: [
            async (req: Request, res: Response) => {
                res.send("Hello from public api")
            }
        ]
    },
    {
        path: `${config.apiPrefix}/ping/private`,
        method: "post",
        handler: [
            async (req: Request, res: Response) => {
                res.send("Hello from private api")
            }
        ]
    }
];
