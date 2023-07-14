import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

type DecodedToken = {
  id: number;
  username: string;
  email: string;
};

export function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || '';
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as DecodedToken;

    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
