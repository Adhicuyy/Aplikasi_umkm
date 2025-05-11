'use server'

import prisma from "@/db";
import { reviewSchema } from "@/schemas";
import { z } from "zod";
import jwt from 'jsonwebtoken';
import { JWT_KEY } from "@/constants";

export async function addReview(data: z.infer<typeof reviewSchema>, token: string, storeId: number) {
  const validatedFields = reviewSchema.safeParse(data);

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

    // Pastikan akun yang direview ada
    const accountExists = await prisma.account.findUnique({
      where: { email: decoded.email },
      select: {
        ownerName: true,
        image: true,
        id: true,
        email: true
      }
    });

    if (!accountExists) {
      return {
        success: false,
        message: "Your account not found",
      };
    }

    // Buat review baru
    const review = await prisma.review.create({
      data: {
        rating: data.rating,
        comment: data.comment,
        storeId: storeId,
        accountId: accountExists.id
      },
    });

    return {
      success: true,
      message: "Review added successfully",
      data: {
        ...review,
        account: {
          ...accountExists
        }
      },
    };
  } catch (error) {
    console.error("Error adding review:", error);
    return {
      success: false,
      message: "Failed to add review",
    };
  }
}
