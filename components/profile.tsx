'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { signOut, useSession } from 'next-auth/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useUpdateProfile } from '@/features/auth/api/use-update-profile';

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
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const onSubmit = async (data: ProfileFormValues) => {
    const updateData = {
      name: data.name,
      currentPassword: data.currentPassword || '', // Provide an empty string if undefined
      newPassword: data.newPassword || '',
    };
    updateProfile(updateData);
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
                    <Input
                      id="new-username"
                      disabled={isPending}
                      value={user.name}
                      {...register('name')}
                      placeholder="Enter new username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      disabled={isPending}
                      {...register('currentPassword')}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      disabled={isPending}
                      {...register('newPassword')}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      disabled={isPending}
                      {...register('confirmPassword')}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save'}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
