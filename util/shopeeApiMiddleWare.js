
const axios = require("axios");

const shopeeLinkToAPI = async (shopeeLink) => {
    const shopAndProductId = shopeeLink.split("?sp_atk")[0].split("-i.")[1]

    const shopId = shopAndProductId.split(".")[0]
    const productId = shopAndProductId.split(".")[1]

    const shopeeApiURL = `https://shopee.co.th/api/v4/item/get?itemid=${productId}&shopid=${shopId}`

    return shopeeApiURL;
}


const shopeeProductInformationFetcher = async (shopeeApiURL) => {
    //fetch Data From API URL
    console.log(shopeeApiURL)
    const result = await axios.get(shopeeApiURL);
    const shopeeData = await result.data
    if (shopeeData.error !== null) {
        throw new Error("shopee error")
    }

    const productInformation = {};

    productInformation.itemId = shopeeData.data.itemid;
    productInformation.name = shopeeData.data.name;
    productInformation.minPrice = shopeeData.data.price_min
    productInformation.maxPrice = shopeeData.data.price_max
    productInformation.discount = shopeeData.data.discount
    productInformation.variations = shopeeData.data.tier_variations;
    productInformation.images = shopeeData.data.images.map(x => `https://cf.shopee.co.th/file/${x}`)
    productInformation.products = shopeeData.data.models

    return productInformation
}

const shopeeApiMiddleWare = async (shopeeLink) => {
    try {
        const shopeeApiURL = await shopeeLinkToAPI(shopeeLink);
        const productInformation = await shopeeProductInformationFetcher(shopeeApiURL);
        return productInformation
    } catch (error) {
        return error
    }

}

module.exports = shopeeApiMiddleWare;
