// PieChart.tsx
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useState } from 'react';
import { Box, Skeleton } from '@mui/material';

interface CustomPieChartProps {
  completed: number;
  rejected: number;
  canceled: number;
}

interface PieData {
  name: string;
  value: number;
}

const COLORS = ['#4CAF50', '#FF9800', '#F44336'];

const CustomPieChart: React.FC<CustomPieChartProps> = ({ completed, rejected, canceled }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Check if all values are zero
  const isAllZero = completed === 0 && rejected === 0 && canceled === 0;

  const data: PieData[] = isAllZero
    ? [
        { name: 'Completed', value: 1 },
        { name: 'Rejected', value: 1 },
        { name: 'Cancelled', value: 1 },
      ]
    : [
        { name: 'Completed', value: completed },
        { name: 'Rejected', value: rejected },
        { name: 'Cancelled', value: canceled },
      ];

  // Function to handle mouse enter
  const handleMouseEnter = ( index: number) => {
    setActiveIndex(index);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  // Function to handle click
  const handleClick = (data: PieData) => {
    alert(`You clicked on ${data.name}: ${data.value}`);
  };

  return (
    <Box>
      {isAllZero ? (
        <Skeleton variant="circular" width={'200px'} height={'200px'} sx={{m:1}}/>
      ) : (
        <PieChart width={250} height={250}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            dataKey="value"
            isAnimationActive={true}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke={activeIndex === index ? '#000' : undefined}
                strokeWidth={activeIndex === index ? 2 : 1}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => `${name}: ${value}`} />
          <Legend />
        </PieChart>
      )}
    </Box>
  );
};

export default CustomPieChart;
