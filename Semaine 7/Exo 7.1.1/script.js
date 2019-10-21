//const bitmexAPI = "bitmex.com/api/v1/orderBook/L2?symbol=XBT&depth=5";
//const bitfinexAPI = "api.bitfinex.com/v1/book/btcusd?limit_bids=5&limit_asks=5";

const bitmexResponse = [
  {
    symbol: "XBTUSD",
    id: 8799175050,
    side: "Sell",
    size: 50840,
    price: 8249.5
  },
  { symbol: "XBTUSD", id: 8799175100, side: "Sell", size: 505980, price: 8249 },
  {
    symbol: "XBTUSD",
    id: 8799175150,
    side: "Sell",
    size: 379585,
    price: 8248.5
  },
  { symbol: "XBTUSD", id: 8799175200, side: "Sell", size: 324400, price: 8248 },
  {
    symbol: "XBTUSD",
    id: 8799175250,
    side: "Sell",
    size: 2320108,
    price: 8247.5
  },
  { symbol: "XBTUSD", id: 8799175300, side: "Buy", size: 28262, price: 8247 },
  { symbol: "XBTUSD", id: 8799175350, side: "Buy", size: 20821, price: 8246.5 },
  { symbol: "XBTUSD", id: 8799175400, side: "Buy", size: 134764, price: 8246 },
  { symbol: "XBTUSD", id: 8799175450, side: "Buy", size: 17297, price: 8245.5 },
  { symbol: "XBTUSD", id: 8799175500, side: "Buy", size: 140388, price: 8245 }
];

const bitfinexResponse = {
  bids: [
    { price: "8266.6", amount: "2.06968327", timestamp: "1571657976.0" },
    { price: "8266.5", amount: "0.2505535", timestamp: "1571657976.0" },
    { price: "8266.3", amount: "0.00055501", timestamp: "1571657976.0" },
    { price: "8265.6", amount: "0.0978", timestamp: "1571657976.0" },
    { price: "8265.1", amount: "0.02419296", timestamp: "1571657976.0" }
  ],
  asks: [
    { price: "8266.7", amount: "0.00445636", timestamp: "1571657976.0" },
    { price: "8268.2", amount: "4.00188611", timestamp: "1571657976.0" },
    { price: "8268.5", amount: "0.05203861", timestamp: "1571657976.0" },
    { price: "8271", amount: "3", timestamp: "1571657976.0" },
    { price: "8271.7", amount: "1.999", timestamp: "1571657976.0" }
  ]
};

clic = () => {
  // on recupère le prix le plus bas de chacun des 2 exchanges
  // bitfinex cela correspond au premier element du tableau asks.
  let bestPriceBitfinex = bitfinexResponse.asks[0].price;

  // pour bitmex.
  let priceArray = [];

  for (let i = 0; i <= 5; i++) {
    priceArray.push(bitmexResponse[i].price);
  }

  let bestPriceBitmex = Math.min(...priceArray);

  bestPriceBitfinex > bestPriceBitmex
    ? console.log("Il faut acheter sur Bitmex")
    : console.log("Il faut acheter sur Bitfinex");
};

clic();
// Fetch pour récupérer le Json d'une API, ici cela ne fonctionne pas(problème de cors)

/*clic = () => {
  fetch(corsScape + bitfinexAPI)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });
};*/
