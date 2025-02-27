"use client"; // Vì chúng ta sẽ thao tác DOM

import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const BitcoinChart = ({ data }: { data: any[] }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 500,
      layout: { background: { color: "white" }, textColor: "black" },
      grid: { vertLines: { color: "#e1e1e1" }, horzLines: { color: "#e1e1e1" } },
    });

    const candleSeries = chart.addCandlestickSeries();
    const volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: { type: "volume" },
      priceScaleId: "", // Tạo scale riêng cho volume
      scaleMargins: { top: 0.7, bottom: 0 }, // Chỉ chiếm 30% chiều cao
    });
    candleSeries.setData(data);
    volumeSeries.setData(data.map((d) => ({ time: d.time, value: d.volume })));
    
    return () => chart.remove();
  }, [data]);

  return <div ref={chartRef} className="chart-container" />;
};

export default BitcoinChart;
