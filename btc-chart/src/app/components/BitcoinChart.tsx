"use client";

import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

const BitcoinChart = ({ data }: { data: any[] }) => {
  //chartRef tạo một tham chiếu đến thẻ <div> chứa biểu đồ
  //giúp truy cập và thao tác với DOM mà không cần re-render component.
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //Nếu chartRef.current chưa có giá trị (tức là <div> chưa được render), thì return ngay để tránh lỗi.
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth, //biểu đồ có kích thước bằng với div
      height: 500,
      layout: { background: { color: "white" }, textColor: "black" },
      grid: { vertLines: { color: "#e1e1e1" }, horzLines: { color: "#e1e1e1" } },
    });

    const candleSeries = chart.addCandlestickSeries();
    const volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: { type: "volume" },
      priceScaleId: "", // Tạo scale riêng cho volume
      scaleMargins: { top: 0.7, bottom: 0 }, // Các cột chiếm 30% chiều cao
    });
    candleSeries.setData(data);
    volumeSeries.setData(data.map((d) => ({ time: d.time, value: d.volume })));
    
    return () => chart.remove(); //Khi component bị unmount hoặc data thay đổi, biểu đồ cũ sẽ bị xóa tránh lỗi khi re-render.
  }, [data]);

  return <div ref={chartRef} className="chart-container" />;
};

export default BitcoinChart;
