import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createCheckoutSession, createOrderPaySession } from '../checkout';

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: async ({
      storeId,
      productIds,
      quantities,
      sizeIds,
      colorIds,
    }: {
      storeId: string;
      productIds: string[];
      quantities: number[];
      sizeIds: string[];
      colorIds: string[];
    }) => {
      return createCheckoutSession(storeId, productIds, quantities, sizeIds, colorIds);
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create checkout session');
    },
  });
};

export const useCreateOrderPaySession = () => {
  return useMutation({
    mutationFn: async ({ storeId, orderId }: { storeId: string; orderId?: string }) => {
      return createOrderPaySession(storeId, orderId);
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create order pay session');
    },
  });
};
