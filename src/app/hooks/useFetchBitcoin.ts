import axios from "axios";
import { useEffect, useState } from "react";
import { UTCTimestamp } from "lightweight-charts";
import { BitcoinCandle } from "../components/BitcoinChart";

const useFetchBitcoin = (interval: string) => {
  const [data, setData] = useState<BitcoinCandle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=200`
        );
        const formattedData: BitcoinCandle[] = response.data.map((d: (string | number)[]) => ({
          time: (Number(d[0]) / 1000) as UTCTimestamp,
          open: parseFloat(d[1] as string),
          high: parseFloat(d[2] as string),
          low: parseFloat(d[3] as string),
          close: parseFloat(d[4] as string),
          volume: parseFloat(d[5] as string),
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, [interval]);

  return data;
};

export default useFetchBitcoin;
