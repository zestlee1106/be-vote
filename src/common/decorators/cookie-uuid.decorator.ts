import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getCookieByString } from 'src/utils';

export const CookieUuid = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const cookie = request.headers.cookie;
    const cookies = getCookieByString(cookie);
    return cookies['uuid'];
  },
);
