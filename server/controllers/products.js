const axios = require("axios")
const xml2js = require('xml2js');




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
                const productLinks = result.urlset.url
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
                    productLinks,
                    message: "Successfully retrieved product links"
                });
            }
        });
    } catch (error) {
        console.log("Error while fetching XML => ", error);
        res.status(500).json({ error: 'Error while fetching XML' });
    }
}