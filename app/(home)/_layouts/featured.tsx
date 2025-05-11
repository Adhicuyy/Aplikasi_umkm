import Card from "@/components/card";
import Rating from "@/components/rating";
import { getAllAccounts } from "@/data/account";
import Link from "next/link";

async function Featured() {
  const res = await getAllAccounts(4);
  const stores = res.data || [];
  if (!res.success) throw Error(res.message);

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Food Businesses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover these exceptional culinary SMEs that have been handpicked for their unique offerings and customer satisfaction.
          </p>
        </div>

        {stores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stores.map((stores) => (
              <Link href={`/stores/${stores.id}`} key={stores.email}>
                <Card
                  hoverable
                  className="h-full transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={stores.image!}
                      alt={stores.businessName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full capitalize">
                      {stores.status}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1 text-gray-800">{stores.businessName}</h3>

                    <div className="flex items-center mb-2">
                      <Rating value={stores.averageRating} size="sm" reviewCount={stores.totalReviews} />
                    </div>

                    <div className="mb-3">
                      <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full capitalize">
                        {stores.category}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                      {stores.description}
                    </p>

                    <div className="text-gray-500 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="block flex-1">{stores.address}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p>Stores is empty</p>
        )}

        <div className="mt-10 text-center">
          <Link href={`/stores`}>
            <button
              className="inline-flex items-center px-6 py-3 border border-orange-500 text-orange-500 bg-white hover:bg-orange-50 rounded-lg transition-colors duration-200 font-medium cursor-pointer"
            >
              Explore All UMKMs
              <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Featured;