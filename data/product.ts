import prisma from "@/db";

export async function getAllProducts(search?: string) {
  try {
    const products = await prisma.product.findMany({
      where: search
        ? {
          OR: [
            { name: { contains: search } },
            { tags: { contains: search } },
          ],
        }
        : undefined,
      include: {
        account: {
          select: {
            id: true,
            businessName: true,
            image: true,
            status: true,
            phone: true,
          },
        },
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

    const productsWithStats = products.map((product) => {
      const stats = reviewStats.find((s) => s.accountId === product.accountId);

      return {
        ...product,
        averageRating: stats?._avg.rating ?? 0,
        totalReviews: stats?._count.rating ?? 0,
      };
    });

    return {
      success: true,
      message: "Products retrieved successfully",
      data: productsWithStats,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      message: "Failed to retrieve products",
    };
  }
}
