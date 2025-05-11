'use server'

import { JWT_KEY } from '@/constants'
import { productSchema } from '@/schemas'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import prisma from '@/db'

export const createProduct = async (data: z.infer<typeof productSchema>, token: string) => {
  const validatedFields = productSchema.safeParse(data);

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

    // Validasi akun (Account)
    const account = await prisma.account.findUnique({
      where: { id: decoded.id },
    })

    if (!account) {
      return { success: false, message: 'Account not found' }
    }

    // Buat produk baru
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: Math.floor(data.price),
        tags: data.tags.toLowerCase(),
        accountId: decoded.id,
        image: data.image,
      },
    });

    return {
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'Invalid or expired token' }
  }
}

export async function deleteProduct(productId: number) {
  try {
    // Pastikan produk ada sebelum menghapus
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    // Hapus produk
    await prisma.product.delete({
      where: { id: productId },
    });

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      message: "Failed to delete product",
    };
  }
}
