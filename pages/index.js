import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const stocks = [
  {
    symbol: "AIICO",
    name: "AIICO Insurance Plc",
    price: 0.85,
    rsi: 62,
    macd: "+0.03",
    volume: 1500000,
    chartData: [
      { date: "Mon", price: 0.81 },
      { date: "Tue", price: 0.83 },
      { date: "Wed", price: 0.82 },
      { date: "Thu", price: 0.84 },
      { date: "Fri", price: 0.85 },
    ],
  },
  {
    symbol: "NEM",
    name: "NEM Insurance Plc",
    price: 4.30,
    rsi: 45,
    macd: "-0.01",
    volume: 800000,
    chartData: [
      { date: "Mon", price: 4.20 },
      { date: "Tue", price: 4.25 },
      { date: "Wed", price: 4.27 },
      { date: "Thu", price: 4.30 },
      { date: "Fri", price: 4.30 },
    ],
  },
];

export default function Home() {
  const [search, setSearch] = React.useState("");

  const filtered = stocks.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">📈 NGX Insurance Stock Tracker</h1>
      <input
        type="text"
        placeholder="Search Insurance Stocks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded w-full max-w-md"
      />

      {filtered.map((stock) => (
        <div key={stock.symbol} className="border rounded p-4 shadow mt-4">
          <h2 className="text-xl font-semibold">{stock.name} ({stock.symbol})</h2>
          <p>Current Price: ₦{stock.price.toFixed(2)}</p>
          <p>RSI: {stock.rsi} {stock.rsi > 70 ? "(Overbought)" : stock.rsi < 30 ? "(Oversold)" : ""}</p>
          <p>MACD: {stock.macd}</p>
          <p>Volume: {stock.volume.toLocaleString()}</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={stock.chartData}>
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}
