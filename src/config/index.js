

const server = process.env.REACT_APP_SERVER || "https://api-dev.materiamx.com"
// "http://predev-api.queenofraw.com";
console.log(process.env)
console.log("env : ", process.env.NODE_ENV);
console.log("server : ", server);

const version = '/api/v1.0/'

let all = {
  imgUrl : "https://thumbnails.queenofraw.com/media/catalog/product",
  thumbnailsUrl: 'https://thumbnails.queenofraw.com/100x115/media/catalog/product',

  routes : {
    login: 'user/login',
    users: 'user/users',
    getUser: 'user',
    roles: 'roles/list',
    createUser: 'user/create',
    favourites: 'purchase/favourites',
    favouriteCount: 'purchase/favourites/list',
    updateUser:'user',
    getVendors: 'supply/vendors',
    getProducts: 'supply/products',
    supplyProducts: 'supply/supply-chain/products',
    supplyProduct: 'supply/product',
    supplyProperties: 'supply/properties',
    proofLink: 'supply/proof-link',
    titleTypes: 'supply/title-types',
    statistics:'statistics',
    purchaseProduct: 'purchase',
    purchaseOrder: 'purchase/order',
    inventory: 'inventory',
    sales: 'sales',
    map: 'map/get-map-details',
    swagger: 'V1/products',
    dynamicData: 'extras/dynamic-data',
    countries: 'store/countries',
    inventoryGenerateQRCode: 'inventory/generate/qrcode',
    forgotPassword: 'user/forgot-password',
    resetPassword: 'user/reset-password',
    feedStatus: 'feeds/list',
    feedInventory:'feeds/list/inventory',
    inventoryUpdate:'feeds/inventory',
    notification:'notification',
    eol:'feeds/eol-product',
    reseller:'feeds/reseller-product',
    getFeedInventory:'feeds/inventory',
    checkout:'payments/checkout',
    shippingCost:'payments/calculate-shipping',
    administration:'administration'
  },
  socketioURL: server,
  chartConfig : {
    color: {
      primary: 'rgba(33,150,243,.85)', // #2196F3
      success: 'rgba(102,187,106,.85)', // #66BB6A
      info: 'rgba(0,188,212,.85)', // #00BCD4
      infoAlt: 'rgba(126,87,194,.85)', // #7E57C2
      warning: 'rgba(255,202,40,.85)', // #FFCA28
      danger: 'rgba(233,75,59,.85)', // #E94B3B
      gray: 'rgba(221,221,221,.3)',
      text: '#898989', // for dark theme as well
      splitLine: 'rgba(0,0,0,.05)',
      skyBlue:'#87cefa',
      splitArea: ['rgba(250,250,250,0.035)', 'rgba(200,200,200,0.1)'],
    }
  }
};

let env = {
  development: {
    api: `${server}${version}`,
    stripePublickey:"pk_test_51HCKEYFSMUCqQT9NtZ5dNopCW2IreLmbR65sR4iHlF6g4fThfyOvo1K9v3g5wPvenwb17hDX6P0y7Kk7zH6qaQs000mjknhceB",
    cookies:{
      name: 'materiamx',
      expiry: 2,
      domain: "localhost"
    }
  },
  staging: {
    api: `${server}${version}`,
    stripePublickey:"pk_test_xdWrSpgg8jyNPF3DoTvsS37200jOzuNlkY",
    cookies: {
      name: 'materiamx',
      expiry: 2,
      domain: ".materiamx.com"
    }
  },
  production: {
    api: `${server}${version}`,
    stripePublickey:"pk_test_xdWrSpgg8jyNPF3DoTvsS37200jOzuNlkY",
    cookies: {
      name: 'materiamx',
      expiry: 2,
      domain: ".materiamx.com"
    }
  }
};

export default {
  ...all,
  ...env[process.env.NODE_ENV]
};
