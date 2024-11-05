import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '../action';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';

interface UpdateProfileData {
  email?: string;
  name: string;
  currentPassword: string;
  newPassword: string;
}

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfile(data),
    onSuccess: () => {
      toast.success('Profile updated successfully');
      signOut({ callbackUrl: '/' });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });
};
