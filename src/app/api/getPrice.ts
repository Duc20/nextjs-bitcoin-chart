import axios from "axios";

export const getPrice = async (type: "current" | "prev" = "current") => {
  try {
    if (type === "current") {
      // Lấy giá hiện tại từ endpoint ticker
      const response = await axios.get(
        "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
      );
      return parseFloat(response.data.price);
    } else {
      // Lấy dữ liệu nến 1 phút, limit=2 sẽ trả về 2 cây nến:
      // - Cây nến đầu tiên: đã hoàn thành (cách đây 1 phút)
      // - Cây nến thứ hai: cây nến hiện tại (chưa hoàn thành)
      const response = await axios.get(
        "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=2"
      );
      // Lấy giá đóng cửa của cây nến đã hoàn thành (index 0)
      return parseFloat(response.data[0][4]);
    }
  } catch (error) {
    console.error("Error fetching price:", error);
    return null;
  }
};
