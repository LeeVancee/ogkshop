import { auth } from '@/auth';
import prismadb from '@/lib/prismadb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, currentPassword, newPassword } = body;

    const session = await auth();
    const userId = session?.user.id;

    const user = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 400 });
    }

    if (user.password === null) {
      return new NextResponse('User password is not set', { status: 400 });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return new NextResponse('Current password is incorrect', { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const updatedUser = await prismadb.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, 'error');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
