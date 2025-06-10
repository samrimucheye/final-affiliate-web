import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AffiliateLink from "@/models/AffiliateLink";
import { connectToDB } from "@/lib/db";

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin") return <p>Access Denied</p>;

  await connectToDB();
  const products = await AffiliateLink.find();

  return (
    <div className="p-4">
      <h1>Admin Product Dashboard</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product._id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
