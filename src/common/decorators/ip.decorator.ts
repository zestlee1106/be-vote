import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 커스텀 데코레이터: IpAddress
 *
 * 이 데코레이터는 요청(Request) 객체에서 클라이언트의 IP 주소를 추출
 * 먼저 'X-Forwarded-For' 헤더를 확인하여 프록시를 통한 원래 클라이언트 IP 주소를 가져옴
 * 'X-Forwarded-For' 헤더가 존재하지 않으면, 기본적으로 Express 또는 Fastify의 IP 주소를 반환
 *
 * @param data - 데코레이터의 데이터 (사용되지 않음)
 * @param ctx - 실행 컨텍스트
 * @returns 클라이언트의 IP 주소
 */
export const IpAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const xForwardedFor = request.headers['x-forwarded-for'];
    if (xForwardedFor) {
      const ips = xForwardedFor.split(',').map((ip) => ip.trim());
      return ips[0]; // 첫 번째 IP가 원래 클라이언트의 IP
    }
    return request.ip || request.raw.ip;
  },
);
