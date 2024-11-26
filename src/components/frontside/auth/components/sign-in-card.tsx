import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SignInFlow } from '../types';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export default function SignInCard({ setState }: SignInCardProps) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onLoginSubmit: SubmitHandler<FieldValues> = async (data) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onSuccess: () => {
          setPending(false);
          toast.success('Successfully signed in!');
          router.push('/');
        },
        onError: (ctx) => {
          setPending(false);
          setError(ctx.error.message || 'Failed to sign in');
          toast.error(ctx.error.message || 'Failed to sign in');
        },
      }
    );
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>

        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-2.5">
          <Input disabled={pending} placeholder="Email" {...registerLogin('email')} />
          <Input disabled={pending} placeholder="Password" type="password" {...registerLogin('password')} />
          <Button className="w-full" type="submit" size="lg" disabled={pending}>
            Continue
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button disabled={pending} onClick={() => {}} variant="outline" size="lg" className="w-full relative">
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with google
          </Button>
          <Button
            disabled={pending}
            // onClick={() => handleProviderSignIn('github')}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Continue with github
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account{' '}
          <span onClick={() => setState('signUp')} className="text-sky-700 hover:underline cursor-pointer">
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
