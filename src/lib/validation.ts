
import { z } from 'zod';
import { validateEmail, validatePassword } from './security';

// Validation schemas using Zod for type safety and security
export const authSchema = {
  email: z.string()
    .min(1, 'Email is required')
    .max(320, 'Email is too long')
    .refine(validateEmail, 'Invalid email format'),
    
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long')
    .refine((password) => validatePassword(password).isValid, 
      'Password must contain uppercase, lowercase, number, and special character'),
    
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name is too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters')
    .transform(val => val.trim())
};

// Specific schemas for login and signup forms
export const loginSchema = z.object({
  email: authSchema.email,
  password: authSchema.password
});

export const signupSchema = z.object({
  firstName: authSchema.name,
  lastName: authSchema.name,
  email: authSchema.email,
  password: authSchema.password,
  confirmPassword: authSchema.password
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const campaignSchema = {
  subject: z.string()
    .min(1, 'Subject is required')
    .max(200, 'Subject is too long')
    .transform(val => val.trim()),
    
  content: z.string()
    .min(1, 'Content is required')
    .max(10000, 'Content is too long'),
    
  recipientSegment: z.enum(['product-announcement', 'newsletter', 'vip-customers', 'new-subscribers'])
};

export const postSchema = {
  title: z.string()
    .min(1, 'Title is required')
    .max(300, 'Title is too long')
    .transform(val => val.trim()),
    
  content: z.string()
    .min(1, 'Content is required')
    .max(5000, 'Content is too long'),
    
  platform: z.enum(['twitter', 'facebook', 'instagram', 'linkedin'])
};

// Generic input sanitization schema
export const sanitizedStringSchema = z.string()
  .transform(val => val.trim())
  .refine(val => !/<script|javascript:|on\w+=/i.test(val), 'Invalid content detected');
