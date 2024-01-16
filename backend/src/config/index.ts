import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  MONGODB_URI,
  HOST,
  EXTERNAL_API_BASE_URL,
  EXTERNAL_API_USERNAME,
  EXTERNAL_API_PASSWORD,
  SECRET_KEY,
  OTP_SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  FILES_DIR,
  TIMEZONE,
  SENDGRID_API_KEY,
  EMAIL_SENDER
} = process.env;
