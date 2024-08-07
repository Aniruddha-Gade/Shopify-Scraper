import { useState } from "react";
import axios from 'axios'
import { PRODUCT_URL } from "../services/api";
import ProductCard from "./ProductCard";
// icons
import { RiDownloadCloud2Fill } from "react-icons/ri";
import companyIcon from '../assets/images/product.gif'
import Img from "./Img";


// get API url
const {
    READ_XML_URL_API, READ_AND_SUMMARIZE_URL_API
} = PRODUCT_URL

const XMLProducts = () => {

    const [sitemapUrl, setSitemapUrl] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);


    // fetch Products
    const fetchProducts = async () => {
        setLoading(true);
        setProducts([])
        try {
            // console.log("Calling backend to fetch products");
            if (sitemapUrl) {
                // const response = await axios.post(READ_XML_URL_API, { sitemapUrl });
                const response = await axios.post(READ_AND_SUMMARIZE_URL_API, { sitemapUrl });

                console.log("READ_XML_URL_API Response => ", response.data);
                // store data in state
                if (response.data.success) {
                    setProducts(response.data.products);
                }
            }
        } catch (error) {
            console.error('Error fetching products', error);
        }
        setLoading(false);
    };
    // console.log("products = ", products)


    // if 'Enter' button clicked, then fetch products
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchProducts();
        }
    };


    // Loading Skeleton for Product-Card
    const LoadingProductCardSkeleton = () => (
        <div className="flex flex-col h-[390px] justify-between bg-gray-700 p-4 rounded-2xl ">
            <div className="w-full h-[270px] rounded-2xl skeleton"></div>

            <div className="py-4 w-full flex flex-col gap-3">
                <div className="h-5 w-full rounded-2xl skeleton"></div>
                <div className="h-5 w-1/2 rounded-2xl skeleton"></div>
                <div className="h-5 w-1/4 rounded-2xl skeleton"></div>
            </div>
        </div>
    )



    return (
        <div className="w-full flex-center flex-col gap-10">
            <div className="bg-orange-950 flex items-center gap-5 p-6 rounded-2xl">
                <img
                    src={companyIcon}
                    alt={'Company Icon'}
                    className="w-14 "
                />
                <h1 className="text-5xl text-center font-bold text-orange-500 underline">
                    Shopify Product Scraper
                </h1>
            </div>

            <div className="w-full flex-center">
                <input
                    type="text"
                    value={sitemapUrl}
                    onChange={(e) => setSitemapUrl(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="p-2 m-4 h-14 w-1/2 border text-black border-gray-300 rounded-xl focus:outline-none  "
                    placeholder="Enter product sitemap XML URL"
                />
                <button
                    onClick={fetchProducts}
                    className="p-4 h-14 flex gap-2 items-center font-semibold bg-green-500 hover:bg-green-600 text-white rounded"
                >
                    <RiDownloadCloud2Fill className="text-xl" /> Fetch Products
                </button>
            </div>


            <div className="w-full flex-center flex-col">
                {/* if there is API call */}
                {loading ? (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                        <LoadingProductCardSkeleton />
                        <LoadingProductCardSkeleton />
                        <LoadingProductCardSkeleton />
                        <LoadingProductCardSkeleton />
                        <LoadingProductCardSkeleton />
                    </div>
                ) :
                    // if NO data found
                    products.length === 0 ? (
                        <div className="bg-slate-500 fle flex-col  w-1/2 h-40 p-10 rounded-2xl text-3xl flex-center  ">
                            <p className="font-semibold text-4xl text-green-500">No Data Found...!</p>
                            <p className="font-semibold text-2xl text-slate-700">Try another Url</p>
                        </div>
                    )
                        :
                        // show list of products 
                        (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                            {products.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>
                        )}
            </div>
        </div>
    )
}

export default XMLProducts