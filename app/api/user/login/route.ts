import prismadb from '@/lib/prismadb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !user?.password) {
      throw new Error('Invalid credentials');
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw new Error('Invalid password');
    }

    if (!user) {
      // No user found, so this is their first attempt to login
      // meaning this is also the place you could do registration
      throw new Error('Admin not found.');
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, 'error');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
