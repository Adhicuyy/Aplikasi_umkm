import { z } from "zod";

export const registerSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  ownerName: z.string().min(1, 'Owner name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
  address: z.string().min(1, 'Business address is required'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(1, 'Description is required'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const profileSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  ownerName: z.string().min(1, 'Owner name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Business address is required'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number().min(0, {
    message: "Price must be a valid number greater than or equal to 0.",
  }),
  tags: z
    .string()
    .regex(/^[a-zA-Z0-9,\s]*$/, {
      message: "Tags may only contain letters, numbers, spaces, and commas.",
    }),
  image: z.string().optional(),
});

export const reviewSchema = z.object({
  rating: z.coerce.number().min(1).max(5, { message: "Rating must be between 1 and 5" }),
  comment: z.string().min(5, { message: "Comment must be at least 5 characters" }),
});