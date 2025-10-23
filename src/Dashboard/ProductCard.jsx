export default function ProductCard({product}) {
  
  return (
    <div className="w-full max-w-xs bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden flex flex-col">
      {/* Product Image */}
      <div className="w-full h-48 bg-white flex items-center justify-center overflow-hidden">
        <img
          src={JSON.parse(product.images.replace(/'/g, '"'))[0]}
          alt="Product"
          className="object-contain w-full h-full"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        {/* Name */}
        <h3 className="text-lg font-semibold text-slate-800 truncate">
          {product?.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 mt-1 truncate">
          {product?.description}
        </p>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-auto pt-3 text-sm">
          <span className="text-slate-500 font-medium">{product?.type}</span>
          <span className="text-slate-800 font-bold">${product?.type == "Rent"?`${product?.price}/Day`:product?.price}</span>
        </div>
      </div>
    </div>
  );
}
