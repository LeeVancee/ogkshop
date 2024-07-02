import prismadb from '@/lib/prismadb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password, role } = body;

    // 检查用户是否已经存在
    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return new NextResponse('Email already registered', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        roles: role,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, 'error');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
