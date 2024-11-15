'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import toast from 'react-hot-toast';

const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type UpdatePasswordFormValues = z.infer<typeof UpdatePasswordSchema>;

export function UpdatePasswordForm() {
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(UpdatePasswordSchema),
  });

  const onSubmit = async (data: UpdatePasswordFormValues) => {
    await authClient.changePassword(
      {
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
        revokeOtherSessions: true,
      },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onSuccess: () => {
          toast.success('Successfully changed password!');
          setIsPending(false);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="current-password">Current Password</Label>
        <Input
          id="current-password"
          type="password"
          disabled={isPending}
          {...register('currentPassword')}
          placeholder="Enter current password"
        />
        {errors.currentPassword && <p className="text-sm text-red-500 mt-1">{errors.currentPassword.message}</p>}
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
        {errors.newPassword && <p className="text-sm text-red-500 mt-1">{errors.newPassword.message}</p>}
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
        {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Updating...' : 'Update Password'}
      </Button>
    </form>
  );
}
