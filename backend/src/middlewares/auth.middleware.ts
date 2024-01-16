import { Request, NextFunction, Response } from 'express';
import { decoder } from '@utils/jwt';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken } from '@interfaces/auth.interface';
import userModel from '@models/users.model';
import roleModel from '@models/roles.model';

import { logger } from '@utils/logger';

const METHODS_DEFINITION = {
  POST: 'create',
  GET: 'read',
  PUT: 'update',
  DELETE: 'remove'
}

const authMiddleware =
  (validUserTypes: string[] = ['basic']) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const accessToken =  req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null;

      if (accessToken) {
        let user;

        const secret: string = SECRET_KEY;
        const { userId, roleId, verify } = (await decoder({ secret })( accessToken )) as DataStoredInToken;

        const role = await roleModel.findById(roleId);

        const { permissions } = role;

        if (!validUserTypes.includes('basic')) {
          const access = validUserTypes.map(module => {
            if (permissions[module] === undefined || !permissions[module].enabled) next(new HttpException(401, `UnAuthorized Access.`));

            // Module should exist, Module is enabled, and has corresponding permission
            return permissions[module] && permissions[module].enabled && permissions[module][METHODS_DEFINITION[req.method]];
          });

          if (access.includes(false)) {
            return res.status(401).json({ success: false, message: `You don't have ${METHODS_DEFINITION[req.method]} permission.` });
          }
        }

        if (userId) {
          user = await userModel.findById(userId);
        }

        // Check if user doesn't exist
        if (!user) res.status(200).json({ success: false, message: `User doesn't exist` });

        // Check if account is blocked
        if (user.isBlocked === 1) {
          return res.status(401).json({ success: false, message: 'User is blocked' });
        }

        // Check if account is deleted
        if (user.isDeleted === 1) {
          return res.status(401).json({ success: false, message: 'User is deleted. Please contact admin' });
        }

        // Check if account is inactive
        if (user.isActive === 0 && !verify) {
          return res.status(401).json({ success: false, message: 'User is inactive. Please contact admin' });
        }

        // Verify current type is still the same as in token
        if (user && String(user.role) !== roleId) {
          return res.status(401).json({ success: false, message: 'Role has been updated. Please login again.' });
        }

        if (user) {
          req.user = user;
          next();
        } else {
          next(new HttpException(401, `UnAuthorized Access.`));
        }
      } else {
        next(new HttpException(404, 'Authentication token missing'));
      }
    } catch (error) {
      logger.error(`[ERROR]: ${req.method} ${req.originalUrl}`, error);

      if (error.message == 'jwt expired') {
        return res.status(401).json({ success: false, error: 'jwt_expired', message: 'Session Expired'})
      }

      if (error.message == 'jwt must be provided' || error.message == 'invalid signature' || error.message == 'invalid token') {
        return res.status(401).json({ success: false, error: 'unauthorized_access', message: 'Unauthorized Access, Please Login'})
      }
    }
  };

export default authMiddleware;
