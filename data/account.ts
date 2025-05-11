import { JWT_KEY } from '@/constants'
import prisma from '@/db'
import jwt from 'jsonwebtoken'

export const getAccountByToken = async (token: string, withoutInclude?: boolean) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY) as {
      id: number;
      email: string;
    };

    // Ambil produk dan review terhadap produk tersebut
    const account = await prisma.account.findUnique({
      where: { id: decoded.id },
      include: !withoutInclude
        ? { products: true }
        : undefined,
    });

    if (!account) {
      return { success: false, message: 'UMKM account not found' };
    }

    if (!withoutInclude) {
      const productReviews = await prisma.review.findMany({
        where: {
          storeId: account.id
        },
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          account: {
            select: {
              ownerName: true,
              image: true,
              id: true,
              email: true
            }
          }
        }
      });

      const ratingAggregate = await prisma.review.aggregate({
        where: { storeId: account.id },
        _avg: { rating: true },
        _count: { rating: true },
      });

      return {
        success: true,
        message: 'UMKM account retrieved successfully',
        data: {
          ...account,
          reviews: productReviews,
          averageRating: ratingAggregate._avg.rating || 0,
          totalReviews: ratingAggregate._count.rating || 0,
        },
      };
    }

    return {
      success: true,
      message: 'UMKM account retrieved successfully',
      data: account,
    };
  } catch (error) {
    return { success: false, message: 'Invalid or expired token' };
  }
};

export const getAccountById = async (id: number, token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY) as {
      id: number
      email: string
    }

    // Ambil data akun UMKM
    const account = await prisma.account.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!account) {
      return { success: false, message: 'UMKM account not found' };
    }

    const productReviews = await prisma.review.findMany({
      where: {
        storeId: account.id
      },
      include: {
        account: {
          select: {
            ownerName: true,
            image: true,
            id: true,
            email: true
          }
        }
      }
    });

    // Hitung rata-rata rating dan total review untuk akun ini
    const ratingAggregate = await prisma.review.aggregate({
      where: { storeId: id },
      _avg: { rating: true },
      _count: { rating: true },
    });

    return {
      success: true,
      message: 'UMKM account retrieved successfully',
      data: {
        ...account,
        reviews: productReviews,
        averageRating: ratingAggregate._avg.rating || 0,
        totalReviews: ratingAggregate._count.rating || 0,
      },
      yourEmail: decoded.email
    };
  } catch (error) {
    return { success: false, message: 'Invalid or expired token' };
  }
};


export async function getAllAccounts(limit?: number) {
  try {
    const accounts = await prisma.account.findMany({
      take: limit,
      include: {
        products: true,
      },
    });

    const reviewStats = await prisma.review.groupBy({
      by: ["accountId"],
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    });

    const accountsWithStats = accounts.map((account) => {
      const stats = reviewStats.find((s) => s.accountId === account.id);

      return {
        ...account,
        averageRating: stats?._avg.rating ?? 0,
        totalReviews: stats?._count.rating ?? 0,
      };
    });

    return {
      success: true,
      message: "UMKM accounts retrieved successfully",
      data: accountsWithStats,
    };
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return {
      success: false,
      message: "Failed to retrieve UMKM accounts",
    };
  }
}

