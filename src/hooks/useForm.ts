import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { UseFormProps } from 'react-hook-form';
import type { z } from 'zod';

export function useZodForm<ZodSchema extends z.ZodType, FieldValues extends Object = z.infer<ZodSchema>>(
  schema: ZodSchema,
  optnios?: UseFormProps<FieldValues>
) {
  return useForm<FieldValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    ...optnios,
  });
}
