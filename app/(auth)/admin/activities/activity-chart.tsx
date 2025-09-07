'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

type ActivityData = {
  month: string;
  count: number;
}[];

export function ActivityChart({ data }: { data: ActivityData }) {
  // Format the data for the chart
  const formattedData = data.map((item) => ({
    month: new Date(item.month).toLocaleString('default', { month: 'short' }),
    count: item.count,
  }));

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart data={formattedData}>
        <XAxis
          dataKey='month'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className='bg-background shadow-sm p-2 border rounded-lg'>
                  <div className='gap-2 grid grid-cols-2'>
                    <div className='flex flex-col'>
                      <span className='text-[0.70rem] text-muted-foreground uppercase'>
                        Vaults
                      </span>
                      <span className='font-bold text-muted-foreground'>
                        {payload[0].value}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey='count'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
