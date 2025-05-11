'use server'

import { JWT_KEY } from '@/constants'
import prisma from '@/db'
import { loginSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

// Fungsi login UMKM
export const loginAccount = async (data: {
  email: string
  password: string
}) => {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Input not valid'
    }
  }

  try {
    // Cari akun berdasarkan email
    const user = await prisma.account.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      return { success: false, message: 'Invalid email or password' }
    }

    // Cocokkan password
    const isPasswordValid = await bcrypt.compare(data.password, user.password)
    if (!isPasswordValid) {
      return { success: false, message: 'Invalid email or password' }
    }

    // Buat JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        businessName: user.businessName,
      },
      JWT_KEY,
      {
        expiresIn: '7d', // Token berlaku selama 7 hari
      }
    )

    const cookie = await cookies();
    cookie.set('auth', token);

    return {
      success: true,
      message: 'Login successful',
      data: token
    }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'Internal server error' }
  }
}
