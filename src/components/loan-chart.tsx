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

// Function to format numbers as currency
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

  const chartData = Object.keys(aggregateData).map((key) => ({
    grade: `Grade ${key}`,
    amount: aggregateData[key], // Raw numeric values for the chart
    amountFormatted: formatAmountForDisplay(aggregateData[key]),
  }));

  const chartConfig = {
    amount: {
      label: "Amount",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="w-full max-h-[500px]">
      <>
        <h3 className="text-center text-xl font-semibold mb-4">
          Total Grade Amounts
        </h3>
        <ResponsiveContainer width="100%" height="100%">
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
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                borderRadius: "8px",
                padding: "8px 12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                color: "white",
              }}
              labelStyle={{
                fontSize: "14px",
                fontWeight: "bold",
              }}
              itemStyle={{
                fontSize: "12px",
                color: "white",
              }}
            />

            <Bar dataKey="amount" fill={chartConfig.amount.color} radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </>
    </ChartContainer>
  );
};
