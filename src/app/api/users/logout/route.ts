import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = NextResponse.json({ message: 'Logged out' });
    response.cookies.set('token', '', { httpOnly: true, expires: 0 });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
