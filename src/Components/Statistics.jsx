import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { BiSolidCircle } from "react-icons/bi";

const Statistics = ({ myTotalFood, myTotalRequestedFood }) => {
  const data = [
    { name: "Foods added by me:", value: myTotalFood },
    { name: "Foods requested by me:", value: myTotalRequestedFood },
  ];

  const COLORS = ["#bfdbfe", "#3b82f6"];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#333333"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xl font-bold font-inter"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="flex gap-1 font-medium font-inter color-2 backdrop-blur-lg bg-white/40 text-dark1 rounded-lg px-4 py-2">
          <p>{data.name}</p>
          <p>{data.value}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = () => (
    <div className="font-inter space-y-4 pt-4 mx-5 mt-4">
      <div className="flex items-center gap-2">
        <BiSolidCircle style={{ color: COLORS[0] }} className="text-2xl" />
        <span className="font-semibold">Foods added by me</span>
      </div>
      <div className="flex items-center gap-2">
        <BiSolidCircle style={{ color: COLORS[1] }} className="text-2xl" />
        <span className="font-semibold">Foods requested by me</span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-center items-center h-[70vh]">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            isAnimationActive={true}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={140}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </div>
    </div>
  );
};

export default Statistics;
