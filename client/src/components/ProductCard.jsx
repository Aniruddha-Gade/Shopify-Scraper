
const ProductCard = ({ product }) => {
    return (
        <div className="flex flex-col justify-between max-w-sm
               bg-slate-600 p-4 rounded-2xl overflow-hidden shadow-lg box-shadow-1">
            <img className="w-full rounded-2xl" src={product?.image} alt={product?.title} />

            <div className="px-6 py-4">
                <div className="font-semibold text-xl mb-2">
                    <span className="text-white/50 font-bold">Title: </span>
                    {product?.title}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
