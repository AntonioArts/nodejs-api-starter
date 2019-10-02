import { Request, Response } from 'express';

import config from '../../config';

export default [
    {
        path: `${config.apiPrefix}/users`,
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                res.send("Users list")
            }
        ]
    }
];
