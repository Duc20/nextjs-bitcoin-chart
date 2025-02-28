"use client";

import { CandlestickData, createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

export type BitcoinCandle = CandlestickData & {
  volume: number;
};

const BitcoinChart = ({ data }: { data: BitcoinCandle[] }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartInstanceRef = useRef<any>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Khởi tạo chart với layout ban đầu dựa theo theme
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: { color: theme === "dark" ? "#333" : "white" },
        textColor: theme === "dark" ? "white" : "black",
      },
      grid: {
        vertLines: { color: "#e1e1e1" },
        horzLines: { color: "#e1e1e1" },
      },
    });
    chartInstanceRef.current = chart;

    const candleSeries = chart.addCandlestickSeries();
    const volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: { type: "volume" },
      priceScaleId: "",
      scaleMargins: { top: 0.7, bottom: 0 },
    });

    candleSeries.setData(data);
    volumeSeries.setData(data.map((d) => ({ time: d.time, value: d.volume })));

    return () => chart.remove();
  }, [data, theme]); // Nếu data thay đổi, ta có thể khởi tạo lại chart

  // Khi theme thay đổi, cập nhật lại layout của chart
  useEffect(() => {
    if (!chartInstanceRef.current) return;
    chartInstanceRef.current.applyOptions({
      layout: {
        background: { color: theme === "dark" ? "#333" : "white" },
        textColor: theme === "dark" ? "white" : "black",
      },
    });
  }, [theme]);

  return <div ref={chartContainerRef} className="chart-container" />;
};

export default BitcoinChart;
