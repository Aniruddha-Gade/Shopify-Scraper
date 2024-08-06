import { useState } from "react";
import axios from 'axios'
import { PRODUCT_URL } from "../services/api";

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
        try {
            // console.log("Calling backend to fetch products");
            const response = await axios.post(READ_XML_URL_API, { sitemapUrl });

            console.log("READ_XML_URL_API Response => ", response.data);
            // store data in state
            if (response.data.success) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error('Error fetching products', error);
        }
        setLoading(false);
    };

    return (
        <div className="w-full flex-center flex-col gap-10">
            <h1 className="text-5xl font-bold text-orange-400 underline">
                Shopify Product Scraper
            </h1>

            <div className="w-full flex-center flex-col">
                <input
                    type="text"
                    value={sitemapUrl}
                    onChange={(e) => setSitemapUrl(e.target.value)}
                    className="p-2 m-4 h-14 w-1/2 border text-black border-gray-300 rounded"
                    placeholder="Enter product sitemap XML URL"
                />
                <button onClick={fetchProducts} className="p-2 font-semibold bg-blue-500 text-white rounded">Fetch Products</button>

            </div>
        </div>
    )
}

export default XMLProducts