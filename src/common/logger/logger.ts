import * as winston from 'winston';

const customFormat = winston.format((info) => {
  if (typeof info.message === 'object') {
    info.message = JSON.stringify(info.message, null, 2);
  }
  return info;
});

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        customFormat(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        winston.format.printf((args) => {
          const { timestamp, level, message, context } = args;
          return `[${timestamp}] [${level}] [${context}]: ${message}`;
        }),
      ),
    }),
  ],
};
