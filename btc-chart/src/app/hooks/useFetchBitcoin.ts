import { useState, useEffect } from "react";
import axios from "axios";

const useFetchBitcoin = (interval: string) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=50`
        );
        const formattedData = response.data.map((d: any) => ({
          time: d[0] / 1000,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
          volume: parseFloat(d[5]), // Thêm dữ liệu khối lượng

        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Cập nhật mỗi phút

    return () => clearInterval(intervalId);
  }, [interval]);

  return data;
};

export default useFetchBitcoin;
