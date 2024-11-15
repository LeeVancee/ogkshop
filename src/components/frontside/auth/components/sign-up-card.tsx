import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SignInFlow } from '../types';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { authClient } from '@/lib/auth-client';
import { setUserRole } from '@/features/auth/action';

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export default function SignUpCard({ setState }: SignUpCardProps) {
  const [pending, setPending] = useState(false);
  const [role, setRole] = useState('user'); // 设置默认角色为 USER

  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSignUpSubmit: SubmitHandler<FieldValues> = async (data) => {
    await authClient.signUp.email(
      {
        email: data.email,
        name: data.name,
        password: data.password,
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onSuccess: () => {
          setPending(false);
          setUserRole(data.email, role);
          toast.success('Successfully signed up!');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || 'Failed to sign up');
        },
      }
    );

    // const submitData = {
    //   email: data.email,
    //   name: data.name,
    //   password: data.password,
    //   role,
    // };

    // registerMutation(submitData);
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>

        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={handleSignUpSubmit(onSignUpSubmit)} className="space-y-2.5">
          <Input disabled={pending} placeholder="Full name" type="text" {...registerSignUp('name')} />
          <Input disabled={pending} placeholder="Email" type="email" {...registerSignUp('email')} />
          <Input disabled={pending} placeholder="Password" type="password" {...registerSignUp('password')} />
          <Select onValueChange={(value) => setRole(value)}>
            <SelectTrigger id="role" aria-label="Role">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>

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
          <Button disabled={pending} onClick={() => {}} variant="outline" size="lg" className="w-full relative">
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Continue with github
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Already have an account{' '}
          <span onClick={() => setState('signIn')} className="text-sky-700 hover:underline cursor-pointer">
            sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
