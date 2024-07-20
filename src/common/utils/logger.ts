import * as winston from 'winston';

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        winston.format.printf(
          ({ timestamp, level, message, context }) =>
            `[${timestamp}] [${level}] [${context}]: ${message}`,
        ),
      ),
    }),
  ],
};
