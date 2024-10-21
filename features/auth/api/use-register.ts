import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { register } from '../action';
import { useRouter } from 'next/navigation';
import { UserRole } from '@prisma/client';

interface RegisterData {
  email: string;
  name: string;
  password: string;
  role: UserRole;
}

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: () => {
      toast.success('Registered successfully');
      router.push('/sign-in'); // 或者你想要重定向到的任何页面
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to register');
    },
  });
};
