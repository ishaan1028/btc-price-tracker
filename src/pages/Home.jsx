import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("https://btc-price-server.onrender.com/");

function beautifyPrice(price) {
  if (price >= 100) return price.toFixed(2);
  return price.toFixed(7);
}

function Home() {
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    socket.on("getBTCPrice", (data) => {
      setPrices((prices) => [data.price, ...prices]);
    });
    socket.on("error", (data) => {
      setError(data.error);
      console.error("data.error", data.error);
    });
  }, []);

  return (
    <>
      <h1 className="errorMsg">{error}</h1>
      <div className="cardwrapper">
        <div className="card">
          <div className="cardHeader">
            <div className="btcImage">
              <img
                src="https://w7.pngwing.com/pngs/927/841/png-transparent-bitcoin-logo-cryptocurrency-ethereum-bitcoin-text-orange-logo-thumbnail.png"
                alt="btc"
              />
            </div>
            <div>
              <h1 className="pairName">BTC/USDT</h1>
              <span>live price by coinmarketcap.com</span>
            </div>
          </div>
          <span>API called every 2 sec but price changes every 15-30 sec</span>
          <div className="cardBody">
            <div className="priceText">
              <h2>
                Current Market Price:{" "}
                <span className="cmpSpan">
                  {prices.length && beautifyPrice(prices[0])}
                </span>
              </h2>
            </div>
            <div className="oldPricesDiv">
              {prices.map((price, index) => {
                if (index === 0) return null;
                return (
                  <p
                    key={price + index}
                    className="oldPricesItem"
                    style={{ borderBottom: "1px solid #ccc" }}
                  >
                    {beautifyPrice(price)}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
