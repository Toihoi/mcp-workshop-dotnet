import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ProgressDonutProps {
  completed: number;
  total: number;
}

const ProgressDonut: React.FC<ProgressDonutProps> = ({ completed, total }) => {
  const data = [
    { name: 'Completed', value: completed },
    { name: 'Remaining', value: total - completed },
  ];
  const COLORS = ['#10B981', '#E5E7EB'];

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div style={{ width: '100%', height: 200, position: 'relative' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{percentage}%</div>
        <div style={{ fontSize: '12px', color: '#6B7280' }}>완료</div>
      </div>
    </div>
  );
};

export default ProgressDonut;
