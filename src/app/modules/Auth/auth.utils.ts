import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string | number
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn: expiresIn as any });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
