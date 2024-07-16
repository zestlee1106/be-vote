import { Injectable, NestMiddleware } from '@nestjs/common';
// 어쩔 수 없이 express 의 Response 를 사용하게끔 하였다...
import { Request, Response, NextFunction } from 'express';
import { getCookieByString } from 'src/utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UuidMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const cookieHeaders = req.headers.cookie;
    const cookies = getCookieByString(cookieHeaders);

    if (!cookies || !cookies['uuid']) {
      const uuid = uuidv4();
      res.cookie('uuid', uuid, {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1년동안 유효
        httpOnly: true,
      });
    }

    next();
  }
}
