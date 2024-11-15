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

const UpdateNameSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

type UpdateNameFormValues = z.infer<typeof UpdateNameSchema>;

interface UpdateNameFormProps {
  defaultValue: string;
}

export function UpdateNameForm({ defaultValue }: UpdateNameFormProps) {
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateNameFormValues>({
    resolver: zodResolver(UpdateNameSchema),
    defaultValues: {
      name: defaultValue,
    },
  });

  const onSubmit = async (data: UpdateNameFormValues) => {
    await authClient.updateUser(
      {
        name: data.name,
      },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onSuccess: () => {
          toast.success('Updated!');
          setIsPending(false);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="new-username">New Username</Label>
        <Input id="new-username" disabled={isPending} {...register('name')} placeholder="Enter new username" />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Update Name'}
      </Button>
    </form>
  );
}
