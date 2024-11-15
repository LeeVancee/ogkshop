import AuthScreen from '@/components/frontside/auth/components/auth-screen';
import { auth } from '@/lib/auth';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session) {
    redirect('/');
  }

  return <AuthScreen />;
}
