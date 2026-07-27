'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, AlertCircle } from 'lucide-react'

export function RecentProducts() {
  const products = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 2499, quantity: 12, status: 'in-stock' },
    { id: 2, name: 'Whole Milk (1L)', category: 'Dairy', price: 65, quantity: 3, status: 'low-stock' },
    { id: 3, name: 'Rice (5kg)', category: 'Groceries', price: 250, quantity: 8, status: 'in-stock' },
    { id: 4, name: 'T-Shirt (Blue)', category: 'Clothing', price: 399, quantity: 2, status: 'low-stock' },
    { id: 5, name: 'Novel - Fiction', category: 'Books', price: 299, quantity: 5, status: 'in-stock' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Recent Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{product.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">{product.category}</Badge>
                  <span className="text-xs text-muted-foreground">₹{product.price}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{product.quantity}</p>
                  <p className="text-xs text-muted-foreground">in stock</p>
                </div>
                {product.status === 'low-stock' && (
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
