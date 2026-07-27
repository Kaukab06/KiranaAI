'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function StockChart() {
  const data = [
    { name: 'Electronics', stock: 45, lowStock: 8 },
    { name: 'Groceries', stock: 78, lowStock: 5 },
    { name: 'Dairy', stock: 32, lowStock: 4 },
    { name: 'Clothing', stock: 56, lowStock: 3 },
    { name: 'Books', stock: 23, lowStock: 2 },
    { name: 'Other', stock: 18, lowStock: 2 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Levels by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Legend />
              <Bar dataKey="stock" fill="#3b82f6" name="In Stock" />
              <Bar dataKey="lowStock" fill="#ef4444" name="Low Stock" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
