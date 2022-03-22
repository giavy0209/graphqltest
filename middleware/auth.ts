import { Response, NextFunction } from 'express'
import { IRequest } from '../interface';
const auth = async function (req: IRequest, res: Response, next: NextFunction) {
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        req['_id'] = req.headers.authorization.split(' ')[1]
        
    } 
    next();
};

export default auth