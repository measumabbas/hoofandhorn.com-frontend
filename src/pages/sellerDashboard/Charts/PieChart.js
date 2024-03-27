import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./style.css";
import Flex from "../../../components/styled/Flex/Flex";
// import Flex from "../";



const COLORS = ["#3E0FFE","#F6344E", "#B454FF","#F5C871"];

const CustomLegend = ({ payload }) => (
  <ul className="custom-legend">
    {payload.map((entry, index) => (
      <Flex align="center" gap={5}>
        <div
          className="legend-dot"
          style={{
            backgroundColor: entry.color,
            width: "10px",
            height: "10px",
            borderRadius: "50%",
          }}
        ></div>
        <li key={`legend-${index}`} style={{ fontFamily: "Roboto" }}>
          {entry.value}
        </li>
      </Flex>
    ))}
  </ul>
);

const MyDonutChart = ({ dashData }) => {
  // const total = data.reduce((acc, item) => acc + item.value, 0);
  const data = [
    { name: "Booked", value: dashData?.completed },
    { name: "Cancelled", value: dashData?.cancelled },
    { name: "No Show", value: dashData?.noshow },
    { name: "Upcomming", value: dashData?.upcomming },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={data}
          cx="50%"
          cy="47%"
          innerRadius={70}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={5}
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ bottom: 17 }} // Adjust this value as needed
          content={<CustomLegend />}
        />
        <text
          x={"50%"}
          y={"40%"}
          textAnchor="middle"
          dominantBaseline="middle"
          className="chart-number"
        >
          {parseInt(dashData?.upcomming) +
            parseInt(dashData?.noshow) +
            parseInt(dashData?.completed) +
            parseInt(dashData?.cancelled)}
        </text>
        <text
          x={"50%"}
          y={"42%"}
          dy={18} // You may adjust this value as well to reduce the gap
          textAnchor="middle"
          dominantBaseline="middle"
          className="chart-label"
        >
          Total Appointments
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MyDonutChart;
