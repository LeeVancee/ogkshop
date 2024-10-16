'use client';
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useActiveTabStore } from '@/hooks/use-activeTab';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import ky from 'ky';

export function AuthDialog() {
  const { activeTab, changeActiveTab } = useActiveTabStore();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('USER'); // 设置默认角色为 USER
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
  const onLoginSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    await signIn('credentials', { ...data, redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials');
        }
        if (callback?.ok && !callback?.error) {
          toast.success('Successfully logged in!');
          setOpen(false);
        }
      })
      .catch((error) => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSignUpSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    // 添加 role 字段到数据中
    const submitData = { ...data, role };

    try {
      await ky.post(`/api/user/register`, { json: submitData });
      toast.success('Successfully created account! redirecting to login...');
      changeActiveTab('login');
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error('Email already registered');
      } else {
        toast.error('Something went wrong!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <div className="flex flex-col items-center gap-4">
          <div className="space-y-2 text-center">
            <DialogTitle className="text-3xl font-bold">Welcome</DialogTitle>
            <p className="text-muted-foreground">Please {activeTab === 'login' ? 'login' : 'sign up'} to continue</p>
          </div>
          <Tabs value={activeTab} onValueChange={(value) => changeActiveTab(value)} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form className="space-y-4" onSubmit={handleLoginSubmit(onLoginSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" {...registerLogin('email')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" {...registerLogin('password')} />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  Login
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form className="space-y-4" onSubmit={handleSignUpSubmit(onSignUpSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" {...registerSignUp('name')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" {...registerSignUp('email')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" {...registerSignUp('password')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>

                  <Select onValueChange={(value) => setRole(value)}>
                    <SelectTrigger id="role" aria-label="Role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      {/* <SelectItem value="ADMIN">Admin</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
