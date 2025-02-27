import axios from "axios";

export const getPrice = async () => {
  try {
    const response = await axios.get(
      "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
    );
    return parseFloat(response.data.price);
  } catch (error) {
    console.error("Error fetching price:", error);
    return null;
  }
};
