const axios = require("axios")
const xml2js = require('xml2js');
require('dotenv').config()




// ======================== READ XML URL ======================== 
exports.readXMLUrl = async (req, res) => {
    // get sitemap XML URL
    const { sitemapUrl } = req.body;

    try {
        // Fetch the sitemap XML data from the specified URL
        const response = await axios.get(sitemapUrl);
        const xml = response.data;
        // console.log("xml = ",xml )

        // Parse the XML data into a JavaScript object
        xml2js.parseString(xml, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error parsing XML' });
            }
            else {
                // Filter the URLs that contain images and map the required fields
                const products = result.urlset.url
                    .filter(url => url['image:image'] && url['image:image'][0])
                    .map(url => ({
                        loc: url.loc[0],
                        image: url['image:image'][0]['image:loc'][0],
                        title: url['image:image'][0]['image:title'][0]
                    })).slice(0, 5);

                // console.log("result = ", result.urlset.url[2])


                // Send response
                res.json({
                    success: true,
                    products,
                    message: "Successfully retrieved product links"
                });
            }
        });
    } catch (error) {
        console.log("Error while fetching XML => ", error);
        res.status(500).json({ error: 'Error while fetching XML' });
    }
}




// ======================== READ AND SUMMARIZE XML URL ======================== 
const GRAQ_API_URL = process.env.GRAQ_API_URL;
const GRAQ_API_KEY = process.env.GRAQ_API_KEY;

// Function to fetch page content
async function fetchPageContent(url) {
    const response = await axios.get(url);
    return response.data;
}


// Function to summarize content
const fetchAndSummarizeProduct = async (url) => {
    try {
        console.log("url = ", url)
        const pageResponse = await axios.get(url);
        const $ = cheerio.load(pageResponse.data);
        const text = $('body').text().replace(/\s+/g, ' ').trim();
        console.log("text = ", text)


        const summaryResponse = await axios.post(`${GRAQ_API_URL}/completions`, {
            model: 'llama-3.1-70b-versatile',
            prompt: `Summarize the following content in 3-4 bullet points:\n\n${text}`,
            max_tokens: 150,
        }, {
            headers: {
                'Authorization': `Bearer ${GRAQ_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("summaryResponse = ", summaryResponse)

        return summaryResponse.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching or summarizing product page', error);
        return 'Error summarizing content';
    }
};



// Function to summarize content using an API
async function summarizeContent(content) {

    const response = await axios.post(GRAQ_API_URL, {
        prompt: `Summarize the following content in 3-4 bullet points:\n${content}`,
        max_tokens: 150
    }, {
        headers: {
            'Authorization': `Bearer ${GRAQ_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });

    console.log("response = ", response.data)

    return response.data.choices[0].text.trim();
}

// main controller
exports.readAndSummarizeUrl = async (req, res) => {
    // get sitemap XML URL
    const { sitemapUrl } = req.body;

    try {
        // Fetch the sitemap XML data from the specified URL
        const response = await axios.get(sitemapUrl);
        const xml = response.data;

        // Parse the XML data into a JavaScript object
        xml2js.parseString(xml, async (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error parsing XML' });
            }

            // Filter the URLs that contain images and map the required fields
            const productLinks = result.urlset.url
                .filter(url => url['image:image'] && url['image:image'][0])
                .map(url => ({
                    loc: url.loc[0],
                    image: url['image:image'][0]['image:loc'][0],
                    title: url['image:image'][0]['image:title'][0]
                })).slice(0, 5);

            console.log("productLinks = ", productLinks)

            // Summarize the content for each product link
            const summarizedProducts = await Promise.all(productLinks.map(async (product) => {
                try {
                    const pageContent = await fetchPageContent(product.loc);
                    const summary = await summarizeContent(pageContent);
                    return {
                        ...product,
                        summary
                    };
                } catch (error) {
                    console.error(`Error summarizing content for URL ${product.loc}:`, error);
                    return {
                        ...product,
                        summary: 'Error summarizing content'
                    };
                }
            }));

            console.log("Done")

            // Send response
            res.json({
                success: true,
                products: summarizedProducts,
                message: "Successfully retrieved product with summary"
            });
        });
    } catch (error) {
        console.log("Error is => ", error);
        res.status(500).json({ error: 'Error fetching XML' });
    }
}