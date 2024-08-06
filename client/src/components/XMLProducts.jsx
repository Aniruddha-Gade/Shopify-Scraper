import { useState } from "react";
import axios from 'axios'
import { PRODUCT_URL } from "../services/api";
import ProductCard from "./ProductCard";

// get API url
const {
    READ_XML_URL_API
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
                const response = await axios.post(READ_XML_URL_API, { sitemapUrl });

                console.log("READ_XML_URL_API Response => ", response.data);
                // store data in state
                if (response.data.success) {
                    setProducts(response.data.productLinks);
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

    return (
        <div className="w-full flex-center flex-col gap-10">
            <h1 className="text-5xl text-center font-bold text-orange-400 underline">
                Shopify Product Scraper
            </h1>

            <div className="w-full flex-center">
                <input
                    type="text"
                    value={sitemapUrl}
                    onChange={(e) => setSitemapUrl(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="p-2 m-4 h-14 w-1/2 border text-black border-gray-300 rounded"
                    placeholder="Enter product sitemap XML URL"
                />
                <button
                    onClick={fetchProducts}
                    className="p-2 h-14 font-semibold bg-blue-500 text-white rounded"
                >
                    Fetch Products
                </button>
            </div>


            <div className="w-full flex-center flex-col">
                {/* if there is API call */}
                {loading ? (
                    <div className="text-5xl text-red-500">Loading</div>
                ) :
                    // if NO data found
                    products.length === 0 ? (
                        <div className="bg-slate-500 w-1/2 h-40 p-10 rounded-2xl text-3xl flex-center  ">
                            <p className="font-semibold text-red-600">No Data Found...!</p>
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