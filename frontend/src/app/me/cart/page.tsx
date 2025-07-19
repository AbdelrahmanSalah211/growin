import CartItem from "@/components/cart/cartItem";
import Link from "next/link";
import { getToken } from "@/lib/auth-actions";
import { getCart } from "@/services/cartService";
import ClearCartButton from "@/components/ui/buttons/ClearCartButton";
import CheckoutButton from "@/components/ui/buttons/CheckoutButton";
import { formatPrice } from "@/utils/formatPrice";

interface CartPageProps {
  onClose: () => void;
}

export default async function CartPage({ onClose }: CartPageProps) {
  const token = await getToken();
  const items = await getCart(token!);
  const total = items.reduce(
    (acc: number, item: any) =>
      acc + parseFloat((item.price as unknown as string) || "0"),
    0
  );
  const itemCount = items.length;

  return (
    <div className="bg-background">
      <div className="mx-[7.5rem] grid grid-rows-[auto_1fr] gap-3 min-h-[22rem]">
        <div className="bg-surface rounded-[1.25rem] p-6 border-border shadow-sm flex items-center justify-between">
          <span>
            <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
            <h2 className="text-base font-medium text-secondary-text font-sans">
              {itemCount} course{itemCount !== 1 ? "s" : ""}
            </h2>
          </span>
          {items.length > 0 && (
            <div className="flex justify-center">
              <ClearCartButton />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {items.length === 0 ? (
            <div className="lg:col-span-3 flex flex-col items-center justify-center py-12 text-center bg-surface rounded-[1.25rem] border-border shadow-sm">
              <h3 className="text-xl font-medium text-primary-text mb-2 font-heading">
                Your cart is empty. Keep browsing to find a course!
              </h3>
              <Link
                href="/search"
                className="mt-6 px-8 py-3 text-primary-text bg-background rounded-[0.3125rem] font-semibold hover:bg-primary-text hover:text-white transition-colors duration-200"
                onClick={onClose}
              >
                Keep browsing
              </Link>
            </div>
          ) : (
            <>
              <div className="lg:col-span-2">
                <div className="space-y-3">
                  {items.map((item: any) => (
                    <CartItem key={`${item.courseId}`} course={item} />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-3">
                  <div className="border border-border rounded-[1.25rem] p-6 bg-surface shadow-sm space-y-2">
                    <h3 className="text-lg font-semibold mb-4 text-primary-text font-heading text-center">
                      Order Summary
                    </h3>

                    <div className="space-y-3">
                      <div className="border-t border-border pt-3 mt-2">
                        <div className="flex justify-between font-semibold text-lg">
                          <span className="text-primary-text font-heading">
                            Total
                          </span>
                          <span className="text-primary-text font-heading">
                            {formatPrice(total, "EGP", "en-US")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <CheckoutButton />

                    <p className="text-xs text-secondary-text mt-4 text-center font-sans">
                      By completing your purchase, you agree to our Terms of
                      Service
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
