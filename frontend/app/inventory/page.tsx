'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { ProductsTable, Product } from '@/components/products-table'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

export default function InventoryPage() {
  const { token, isLoading } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Basmati Rice',
      category: 'Groceries',
      price: 450,
      quantity: 50,
    },
    {
      id: '2',
      name: 'Toned Milk',
      category: 'Dairy',
      price: 65,
      quantity: 120,
    },
    {
      id: '3',
      name: 'Cooking Oil',
      category: 'Groceries',
      price: 180,
      quantity: 30,
    },
  ])

  useEffect(() => {
    if (!isLoading && !token) {
      router.push('/')
    }
  }, [token, isLoading, router])

  if (isLoading) {
    return (
      <DashboardLayout currentPage="inventory">
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </DashboardLayout>
    )
  }

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    }
    setProducts([...products, newProduct])
  }

  const handleEditProduct = (id: string, product: Omit<Product, 'id'>) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, ...product }
          : p
      )
    )
  }

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  return (
    <DashboardLayout currentPage="inventory">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your products and stock levels
          </p>
        </div>

        <ProductsTable
          products={products}
          onAdd={handleAddProduct}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>
    </DashboardLayout>
  )
}
