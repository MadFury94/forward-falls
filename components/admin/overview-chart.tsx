'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
    { name: 'Jan', total: 1800 },
    { name: 'Feb', total: 2200 },
    { name: 'Mar', total: 2800 },
    { name: 'Apr', total: 2400 },
    { name: 'May', total: 3200 },
    { name: 'Jun', total: 3800 },
    { name: 'Jul', total: 4200 },
    { name: 'Aug', total: 3600 },
    { name: 'Sep', total: 4800 },
    { name: 'Oct', total: 5200 },
    { name: 'Nov', total: 4400 },
    { name: 'Dec', total: 3900 },
]

export function OverviewChart() {
    return (
        <ResponsiveContainer width='100%' height={350}>
            <BarChart data={data}>
                <XAxis dataKey='name' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}`} />
                <Bar dataKey='total' fill='currentColor' radius={[4, 4, 0, 0]} className='fill-primary' />
            </BarChart>
        </ResponsiveContainer>
    )
}
