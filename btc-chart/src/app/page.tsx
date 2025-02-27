"use client"; // Next.js 13 cần dùng "use client" cho component có trạng thái

import React, { useState } from "react";
import BitcoinChart from "./components/BitcoinChart";
import useFetchBitcoin from "./hooks/useFetchBitcoin";
import ThemeToggle from "./components/ThemeToggle";
import { getPrice } from "./api/getPrice";

const Home = () => {
  const [interval, setInterval] = useState("1m");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const data = useFetchBitcoin(interval);

  const fetchPrices = async () => {
    const priceNow = await getPrice();
    setCurrentPrice(priceNow);

    setTimeout(async () => {
      const price1MinAgo = await getPrice();
      setPrevPrice(price1MinAgo);
    }, 60000); // Lấy giá 1 phút trước
  };

  return (
    <div className="container">
      <h1>Bitcoin Chart</h1>
      <select onChange={(e) => setInterval(e.target.value)} value={interval}>
        <option value="1m">1 phút</option>
        <option value="3m">3 phút</option>
        <option value="5m">5 phút</option>
        <option value="10m">10 phút</option>
        <option value="15m">15 phút</option>
        <option value="30m">30 phút</option>
        <option value="45m">45 phút</option>
        <option value="1h">1 giờ</option>
        <option value="2h">2 giờ</option>
        <option value="3h">3 giờ</option>
        <option value="4h">4 giờ</option>
        <option value="6h">6 giờ</option>
        <option value="8h">8 giờ</option>
        <option value="12h">12 giờ</option>
        <option value="1d">1 ngày</option>
        <option value="3d">3 ngày</option>
        <option value="1w">1 tuần</option>
      </select>
      <button onClick={fetchPrices}>Lấy giá Bitcoin</button>
      {currentPrice !== null && <p>Giá hiện tại: {currentPrice} USD</p>}
      {prevPrice !== null && <p>Giá cách đây 1 phút: {prevPrice} USD</p>}
      <BitcoinChart data={data} />
      <ThemeToggle />
    </div>
  );
};

export default Home;
