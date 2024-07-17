import { ConfigService } from '@nestjs/config';

export const getAuthConfig = (configService: ConfigService) => {
  return {
    jwtOptions: [
      {
        secret: configService.get('JWT_ACCESS_SECRET'),
        expiresIn: configService.get('JWT_ACCESS_EXPIRES'),
      },
      {
        secret: configService.get('JWT_REFRESH_SECRET'),
        expiresIn: configService.get('JWT_REFRESH_EXPIRES'),
      },
    ],
  };
};
