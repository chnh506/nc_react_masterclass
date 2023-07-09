import { useQuery } from "react-query";
import { fetchCoinHistory } from "../apifetch";
import ApexCharts from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading Chart ..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              name: "price",
              data:
                data?.map((price) => {
                  return {
                    x: new Date(price.time_close),
                    y: [
                      parseFloat(price.open).toFixed(1),
                      parseFloat(price.high).toFixed(1),
                      parseFloat(price.low).toFixed(1),
                      parseFloat(price.close).toFixed(1),
                    ],
                  };
                }) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            // grid: { show: false },
            chart: {
              type: "candlestick",
              height: 500,
              background: "#2f3640",
              toolbar: { show: false },
            },
            title: {
              text: "Price Chart",
              align: "left",
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            // yaxis: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
