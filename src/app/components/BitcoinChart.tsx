"use client";

import { createChart, CandlestickData } from "lightweight-charts";
import { useEffect, useRef } from "react";

export type BitcoinCandle = CandlestickData & {
  volume: number;
};

const BitcoinChart = ({ data }: { data: BitcoinCandle[] }) => {
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
      priceScaleId: "",
      scaleMargins: { top: 0.7, bottom: 0 },
    });

    candleSeries.setData(data);
    volumeSeries.setData(data.map((d) => ({ time: d.time, value: d.volume })));

    return () => chart.remove();
  }, [data]);

  return <div ref={chartRef} className="chart-container" />;
};

export default BitcoinChart;
