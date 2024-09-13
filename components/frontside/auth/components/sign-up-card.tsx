import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SignInFlow } from '../types';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import ky from 'ky';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export default function SignUpCard({ setState }: SignUpCardProps) {
  const [pending, setPending] = useState(false);
  const [role, setRole] = useState('USER'); // 设置默认角色为 USER

  const handleProviderSignUp = (value: 'github' | 'google') => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

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
    setPending(true);

    // 添加 role 字段到数据中
    const submitData = { ...data, role };

    try {
      await ky.post(`/api/user/register`, { json: submitData });
      toast.success('Successfully created account! redirecting to login...');
      setState('signIn');
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error('Email already registered');
      } else {
        toast.error('Something went wrong!');
      }
    } finally {
      setPending(false);
    }
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
              <SelectItem value="USER">User</SelectItem>
              {/* <SelectItem value="ADMIN">Admin</SelectItem> */}
            </SelectContent>
          </Select>

          <Button className="w-full" type="submit" size="lg" disabled={pending}>
            Continue
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => handleProviderSignUp('google')}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with google
          </Button>
          <Button
            disabled={pending}
            onClick={() => handleProviderSignUp('github')}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
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
