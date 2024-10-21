'use server';
import prismadb from '@/lib/prismadb';
import bcrypt from 'bcryptjs';
import { auth, signIn } from '@/auth';
import { UserRole } from '@prisma/client';

export async function login(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

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

  try {
    await signIn('credentials', { email, password, redirect: false });
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Failed to sign in');
  }
}

interface RegisterData {
  email: string;
  name: string;
  password: string;
  role: UserRole;
}

export async function register({ email, name, password, role }: RegisterData) {
  if (!email || !name || !password || !role) {
    throw new Error('All fields are required');
  }

  // 检查用户是否已经存在
  const existingUser = await prismadb.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        roles: role,
      },
    });

    return { success: true, user };
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Failed to register user');
  }
}

interface UpdateProfileData {
  email?: string;
  name: string;
  currentPassword: string;
  newPassword: string;
}

export async function updateProfile({ email, name, currentPassword, newPassword }: UpdateProfileData) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Not authenticated');
  }

  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.password === null) {
    throw new Error('User password is not set');
  }

  // Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new Error('Current password is incorrect');
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  try {
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

    // 不要返回完整的用户对象，只返回非敏感信息
    return {
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
      },
    };
  } catch (error) {
    console.error('Profile update error:', error);
    throw new Error('Failed to update profile');
  }
}
