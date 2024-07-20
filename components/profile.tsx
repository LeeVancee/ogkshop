'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

const ProfileSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ProfileFormValues = z.infer<typeof ProfileSchema>;

export default function Profile() {
  const { data: session } = useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: session?.user.name,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setLoading(true);
    try {
      await axios.post(`/api/user/profile`, data);
      toast.success('Profile updated successfully, Please re-login...');
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error('Invalid credentials');
      }
    } finally {
      setLoading(false);
      setTimeout(() => {
        signOut({ callbackUrl: '/' });
      }, 1000);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium ">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  defaultValue={user.name}
                  {...register('name')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Change Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="current-password" className="block text-sm font-medium">
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  placeholder="Enter your current password"
                  type="password"
                  {...register('currentPassword')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="new-password" className="block text-sm font-medium">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  placeholder="Enter your new password"
                  type="password"
                  {...register('newPassword')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                />
              </div>
              <div>
                <Label htmlFor="confirm-password" className="block text-sm font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  placeholder="Confirm your new password"
                  type="password"
                  {...register('confirmPassword')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Button size="lg">Save</Button>
        </div>
      </form>
    </div>
  );
}
