import Img from "./Img";

const ProductCard = ({ product }) => {
    return (
        <div className="flex flex-col justify-between max-w-sm
               bg-slate-600 p-4 rounded-2xl overflow-hidden box-shadow-1">
            <Img
                src={product?.image}
                alt={product?.title}
                className="w-full rounded-2xl"
            />

            <div className="py-4">
                <div className="font-semibold text-xl mb-2">
                    <span className="text-white/50 font-bold">Title: </span>
                    {product?.title}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
