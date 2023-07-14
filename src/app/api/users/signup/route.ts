import { NextResponse, NextRequest } from 'next/server';
import bcryptjs from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await request.json();
    const { fullname, email, password } = reqBody;

    if (!fullname || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // check if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create user
    const newUser = await prisma.user.create({
      data: {
        name: fullname,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ user: newUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
