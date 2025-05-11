'use server'

import prisma from '@/db'
import { registerSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

// Fungsi untuk melakukan registrasi UMKMAccount
export const registerAccount = async (data: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Input not valid'
    }
  }

  try {
    // Validasi apakah email sudah digunakan
    const existingAccount = await prisma.account.findUnique({
      where: { email: data.email },
    })

    if (existingAccount) {
      return { success: false, message: 'Email is already registered' }
    }

    // Validasi nomor telepon (misalnya, hanya menerima angka dan panjangnya tepat)
    const phoneRegex = /^[0-9]{10,15}$/
    if (!phoneRegex.test(data.phone)) {
      return { success: false, message: 'Phone number is not valid' }
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // Menyimpan data UMKMAccount ke database
    const newUMKMAccount = await prisma.account.create({
      data: {
        businessName: data.businessName,
        ownerName: data.ownerName,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        address: data.address,
        category: data.category,
        description: data.description,
        image: `https://placehold.co/400x300?text=${data.businessName.replaceAll(' ', '+')}`
      },
    })

    return { success: true, message: 'UMKM account created successfully', data: newUMKMAccount }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'Internal server error' }
  }
}
