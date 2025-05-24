
export interface ItemData {
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  id: string;
}

interface CartItemProps {
  data: ItemData;
  mode: "subscription" | "checkout";
  onCancelled?: () => void;
}

function CartItem({ data, mode }: CartItemProps) {
  return (
    <div className="flex flex-col sm:flex-row border rounded-xl overflow-hidden shadow-md w-full max-w-4xl mx-auto">
      <img
        src={data.image}
        alt={data.name}
        className="object-cover w-full sm:w-52 h-52 sm:h-auto"
      />

      <div className="flex flex-col justify-between p-4 w-full">
        <div className="mb-4 space-y-2">
          <h2 className="text-xl font-semibold">{data.name}</h2>
          <div className="space-y-1 text-sm text-gray-700">
            <p>{data.description}</p>
            {mode === "checkout" && (
              <p className="text-gray-600">Quantity: {data.quantity}</p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <p className="text-2xl font-bold text-blue-600">${data.price}</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
