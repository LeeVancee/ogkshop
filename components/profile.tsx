'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { signOut, useSession } from 'next-auth/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ky from 'ky';

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
      await ky.post(`/api/user/profile`, { json: data });
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
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>View and manage your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Personal Information</TabsTrigger>
              <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <p className="text-lg">{user.name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-lg">{user.email}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="edit">
              <div className="space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="new-username">New Username</Label>
                    <Input id="new-username" value={user.name} {...register('name')} placeholder="Enter new username" />
                  </div>
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      {...register('currentPassword')}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      {...register('newPassword')}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      {...register('confirmPassword')}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button type="submit">Save</Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
