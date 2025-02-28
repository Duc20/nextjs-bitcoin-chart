import axios from "axios";
import { useEffect, useState } from "react";

const useFetchBitcoin = (interval: string) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //interval - Chu kỳ thời gian của nến
          //limit - Số lượng nến trả về
          `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=200`
        );
        const formattedData = response.data.map((d: any) => ({
          time: d[0] / 1000,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
          volume: parseFloat(d[5]),

        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Dữ liệu giá BTC đươc cập nhật mỗi phút

    return () => clearInterval(intervalId); //Dọn dẹp interval khi interval thay đổi hoặc component bị unmount để tránh memory leak.
  }, [interval]);

  return data;
};

export default useFetchBitcoin;
