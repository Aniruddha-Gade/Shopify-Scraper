import { useEffect, useState } from "react";
import axios from 'axios'
import { PRODUCT_URL } from "../services/api";
import ProductCard from "./ProductCard";
// icons
import { RiDownloadCloud2Fill } from "react-icons/ri";
import companyIcon from '../assets/images/product.gif'


// get API url
const {
    READ_XML_URL_API, READ_AND_SUMMARIZE_URL_API
} = PRODUCT_URL

const XMLProducts = () => {

    const [sitemapUrl, setSitemapUrl] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);


    // fetch Products
    const fetchProducts = async (url) => {
        setLoading(true);
        setProducts([])
        console.log("url = ", url)
        try {
            // console.log("Calling backend to fetch products");
            if (url) {
                // const response = await axios.post(READ_XML_URL_API, { sitemapUrl: url });
                const response = await axios.post(READ_AND_SUMMARIZE_URL_API, { sitemapUrl: url });

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
            fetchProducts(sitemapUrl);
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

    // examples of XML Url
    const exampleXMLUrl = [
        {
            id: 0,
            url: "https://skinny.buywithai.shop/sitemap_products_1.xml?from=8301017759977&to=8420664934633"
        },
        {
            id: 1,
            url: "https://www.skinvestment.store/sitemap_products_1.xml?from=8791014015309&to=8805425185101"
        },
        {
            id: 2,
            url: "https://plumgoodness.com/sitemap_products_1.xml?from=290339409&to=7740185378876"
        },
        {
            id: 3,
            url: "https://skindulge.in/sitemap_products_1.xml?from=8003642196244&to=9430137209108"
        }
    ]

    // handle Example Click
    const handleExampleClick = (url) => {
        console.log("handleExampleClick url = ,url")
        setSitemapUrl(url);
        fetchProducts(url);
    };

    // useEffect to fetch products when sitemapUrl changes
    // useEffect(() => {
    //     if (sitemapUrl) {
    //         fetchProducts(sitemapUrl);
    //     }
    // }, [sitemapUrl]);


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

            <div className="w-full flex-center flex-col">
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
                        onClick={() => fetchProducts(sitemapUrl)}
                        className="p-4 h-14 group flex gap-2 items-center font-semibold bg-green-500 hover:scale-95 hover:bg-white hover:text-green-600 text-white rounded duration-300"
                    >
                        <RiDownloadCloud2Fill className="text-xl group-hover:text-green-500" /> Fetch Products
                    </button>
                </div>

                <div className="text-white">
                    <h3 className="text-xl font-semibold">Examples of XML Url, Try it...!</h3>
                    <ul>
                        {exampleXMLUrl.map((link, ind) => (
                            <li
                                key={link.url + link.id}
                                onClick={() => handleExampleClick(link.url)}
                                className={`text-blue-500 duration-200 cursor-pointer ${link.url === sitemapUrl ?'text-orange-700' :'hover:text-orange-500'}`}
                            >
                                <span>{ind + 1} . </span>
                                {link.url}
                            </li>
                        ))}
                    </ul>

                </div>
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
                    // if NO data found and sitemapUrl is set
                    sitemapUrl && products.length === 0 ? (
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