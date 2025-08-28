
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { sanitizeInput, createRateLimiter } from '@/lib/security';

interface SecureFormProps {
  schema: z.ZodSchema;
  onSubmit: (data: any) => void;
  fields: Array<{
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
  }>;
  submitText?: string;
  className?: string;
}

// Rate limiter for form submissions (max 5 attempts per minute)
const rateLimiter = createRateLimiter(5, 60000);

const SecureForm: React.FC<SecureFormProps> = ({
  schema,
  onSubmit,
  fields,
  submitText = 'Submit',
  className = ''
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rateLimitError, setRateLimitError] = useState<string>('');

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = ""; // ensure controlled inputs
      return acc;
    }, {} as Record<string, string>),
  });


  const handleSubmit = async (data: any) => {
    // Rate limiting check
    const clientId = 'user-session'; // In real app, use actual user/session ID
    if (!rateLimiter(clientId)) {
      setRateLimitError('Too many attempts. Please wait before trying again.');
      return;
    }

    setRateLimitError('');
    setIsSubmitting(true);

    try {
      // Sanitize all string inputs
      const sanitizedData = Object.keys(data).reduce((acc, key) => {
        acc[key] = typeof data[key] === 'string' ? sanitizeInput(data[key]) : data[key];
        return acc;
      }, {} as any);

      await onSubmit(sanitizedData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={`space-y-4 ${className}`}>
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    {...formField}
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    disabled={isSubmitting}
                    autoComplete={field.type === 'password' ? 'current-password' : 'off'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        
        {rateLimitError && (
          <div className="text-red-500 text-sm">{rateLimitError}</div>
        )}
        
        <Button 
          type="submit" 
          disabled={isSubmitting || !form.formState.isValid}
          className="w-full"
        >
          {isSubmitting ? 'Submitting...' : submitText}
        </Button>
      </form>
    </Form>
  );
};

export default SecureForm;
