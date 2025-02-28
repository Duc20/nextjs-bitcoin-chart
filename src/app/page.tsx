"use client";

import { useState } from "react";
import { getPrice } from "./api/getPrice";
import BitcoinChart from "./components/BitcoinChart";
import ThemeToggle from "./components/ThemeToggle";
import useFetchBitcoin from "./hooks/useFetchBitcoin";

//danh sách các tùy chọn chu kỳ thời gian của dữ liệu trong biểu đồ
const timeOptions = [
  { value: "1m", label: "1 phút" },
  { value: "3m", label: "3 phút" },
  { value: "5m", label: "5 phút" },
  { value: "10m", label: "10 phút" },
  { value: "15m", label: "15 phút" },
  { value: "30m", label: "30 phút" },
  { value: "45m", label: "45 phút" },
  { value: "1h", label: "1 giờ" },
  { value: "2h", label: "2 giờ" },
  { value: "3h", label: "3 giờ" },
  { value: "4h", label: "4 giờ" },
  { value: "6h", label: "6 giờ" },
  { value: "8h", label: "8 giờ" },
  { value: "12h", label: "12 giờ" },
  { value: "1d", label: "1 ngày" },
  { value: "3d", label: "3 ngày" },
  { value: "1w", label: "1 tuần" },
];

const Home = () => {
  const [interval, setInterval] = useState("1m");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const data = useFetchBitcoin(interval); //chuẩn bị các dữ liệu từ API của Binance vào "data" để vẽ biểu đồ

  // Lấy giá Bitcoin hiện tại
  const fetchCurrentPrice = async () => {
    const priceNow = await getPrice("current");
    setCurrentPrice(priceNow);
  };

  // Lấy giá Bitcoin thời điểm 1 phút trước
  const fetchPrevPrice = async () => {
    const price1MinAgo = await getPrice("prev");
    setPrevPrice(price1MinAgo);
  };
  console.log(prevPrice)
  return (
    <div className="container">
      <h1>Bitcoin Chart</h1>
      <select onChange={(e) => setInterval(e.target.value)} value={interval}>
        {timeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
 
      <BitcoinChart data={data} />
      <ThemeToggle />
      <div>
        <button onClick={fetchCurrentPrice}>Lấy giá Bitcoin</button>
        {currentPrice !== null && <span>Giá hiện tại: {currentPrice} USD</span>}
      </div>
      <div>
        <button onClick={fetchPrevPrice}>Lấy giá cách đây 1 phút</button>
        {prevPrice !== null && <span>Giá cách đây 1 phút: {prevPrice} USD</span>}
      </div>
    </div>
  );
};

export default Home;
