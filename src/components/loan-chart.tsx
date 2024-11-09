import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useLoanStore } from "@/store/loan-store";

const formatAmountForDisplay = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};

export const LoanChart: React.FC = () => {
  const { aggregateData } = useLoanStore();

  // Prepare chart data with numeric values for rendering the chart
  const chartData = Object.keys(aggregateData).map((key) => ({
    grade: `Grade ${key}`,
    amount: aggregateData[key], // Raw numeric values for the chart
    amountFormatted: formatAmountForDisplay(aggregateData[key]), // Formatted for display (e.g., tooltips, table)
  }));

  const chartConfig = {
    amount: {
      label: "Amount",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="w-full">
      <>
        <h3 className="text-center text-xl font-semibold mb-4">
          Amount by Grade
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="grade" />
            <YAxis
              domain={["auto", "auto"]}
              tickFormatter={(value) => formatAmountForDisplay(value)}
            />
            <Tooltip
              formatter={(value) => formatAmountForDisplay(Number(value))}
            />
            <Bar dataKey="amount" fill={chartConfig.amount.color} radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </>
    </ChartContainer>
  );
};
