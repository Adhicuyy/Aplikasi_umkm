'use server'

import { profileSchema } from "@/schemas";
import { z } from "zod";
import prisma from '@/db'
import jwt from 'jsonwebtoken'
import { JWT_KEY } from "@/constants";

export const updateProfile = async (data: z.infer<typeof profileSchema>, token: string) => {
  const validatedFields = profileSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Input not valid'
    }
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY) as {
      id: number
      email: string
    }

    const account = await prisma.account.update({
      where: { email: decoded.email },
      data
    });

    return {
      success: true,
      message: 'UMKM account updated successfully',
      data: account,
    }
  } catch (error) {
    return { success: false, message: 'Invalid or expired token' }
  }
}