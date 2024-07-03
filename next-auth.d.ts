import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    roles?: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      roles?: string;
    } & DefaultSession['user'];
  }
}

// 扩展 JWT 类型
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    roles?: string;
  }
}
