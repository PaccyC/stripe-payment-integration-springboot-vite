interface TotalFooterProps {
  total: number;
  mode: "checkout" | "subscription" | "trial";
}

function TotalFooter({ total, mode }: TotalFooterProps) {
  return (
    <>
      <hr className="border-t border-gray-300 my-4" />
      <div className="flex items-center justify-between">
        <p className="text-base font-medium">Total</p>
        <p className="text-2xl text-blue-600 font-bold">${total}</p>
      </div>

      {mode === "subscription" && (
        <p className="text-xs text-gray-600 mt-1">
          (Monthly, starting today)
        </p>
      )}
      {mode === "trial" && (
        <p className="text-xs text-gray-600 mt-1">
          (Monthly, starting next month)
        </p>
      )}
    </>
  );
}

export default TotalFooter;
