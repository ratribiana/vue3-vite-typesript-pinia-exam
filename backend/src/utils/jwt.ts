import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';

export const now = (): number => new Date().getTime() / 1000;

interface EncoderConfig {
  secret: string;
  expireInSeconds: number;
  time?: () => number;
}

interface Payload {
  [key: string]: any;
}

interface DecoderConfig {
  secret: string;
}

interface DecoderWithOptionsConfig {
  secret: string;
  options: VerifyOptions;
}

export const encoder =
  ({ secret, expireInSeconds, time = now }: EncoderConfig) =>
  (payload: Payload) =>
    jwt.sign(
      {
        exp: time() + expireInSeconds,
        ...payload,
      },
      secret,
      { algorithm: 'HS256' } as SignOptions,
    );

export const encoderNoExp =
  ({ secret }: { secret: string }) =>
  (payload: Payload) =>
    jwt.sign(
      {
        ...payload,
      },
      secret,
      { algorithm: 'HS256' } as SignOptions,
    );

export const decoder =
  ({ secret }: DecoderConfig) =>
  (encoded: string) =>
    jwt.verify(encoded, secret, { algorithms: ['HS256'] } as VerifyOptions);

export const decoderOptions =
  ({ secret, options }: DecoderWithOptionsConfig) =>
  (encoded: string) =>
    jwt.verify(encoded, secret, options);

export const expire =
  ({ secret, time = now }: { secret: string; time?: () => number }) =>
  (payload: Payload) =>
    jwt.sign(
      {
        iat: Math.floor(Date.now() / 1000) - 30,
        ...payload,
      },
      secret,
    );
