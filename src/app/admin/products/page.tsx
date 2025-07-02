import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AffiliateLink from "@/models/AffiliateLink";
import { connectToDB } from "@/lib/db";
import Link from "next/link";

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
          <p className="text-red-500 font-bold text-2xl mb-2">Access Denied</p>
          <p className="text-gray-500">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  await connectToDB();
  let products: any[] = [];
  try {
    products = await AffiliateLink.find();
  } catch (error) {
    products = [];
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <header className="flex items-center justify-between px-10 py-8 bg-white shadow-lg rounded-b-3xl">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 tracking-tight">
          Admin Product Dashboard
        </h1>
      </header>
      <main className="max-w-4xl mx-auto mt-12 bg-white p-10 rounded-3xl shadow-2xl">
        <ul className="space-y-6">
          {products && products.length > 0 ? (
            products.map((product: any) => (
              <li
                key={product._id}
                className="flex items-center justify-between border-b last:border-b-0 pb-6 last:pb-0 group transition hover:bg-blue-50 rounded-xl px-4"
              >
                <div className="flex items-center space-x-6">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      className="w-20 h-20 object-cover rounded-xl shadow-md border-2 border-blue-100"
                    />
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-xl text-gray-400 text-3xl font-bold shadow-md border-2 border-blue-100">
                      ?
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-lg text-gray-800 flex items-center gap-2">
                      {product.productName}
                      {product.isFeatured && (
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-0.5 rounded text-xs font-semibold ml-2">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </div>
                    {product.affiliateUrl && (
                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition"
                      >
                        Visit Affiliate Link →
                      </a>
                    )}
                  </div>
                </div>
                <Link
                  href={`/admin/products/${product._id}`}
                  className="ml-6 px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition font-semibold text-sm opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  View Details
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-400 text-center py-10 text-lg">
              No products found.
            </li>
          )}
        </ul>
      </main>
    </div>
  );
}
