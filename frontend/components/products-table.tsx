'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Edit, Plus, Search } from 'lucide-react'
import { ProductDialog } from './product-dialog'

export interface Product {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

interface ProductsTableProps {
  products: Product[]
  onAdd: (product: Omit<Product, 'id'>) => void
  onEdit: (id: string, product: Omit<Product, 'id'>) => void
  onDelete: (id: string) => void
}

export function ProductsTable({ products, onAdd, onEdit, onDelete }: ProductsTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = (product: Omit<Product, 'id'>) => {
    onAdd(product)
    setIsDialogOpen(false)
    setSelectedProduct(null)
  }

  const handleEdit = (product: Omit<Product, 'id'>) => {
    if (editingId) {
      onEdit(editingId, product)
      setEditingId(null)
      setIsDialogOpen(false)
      setSelectedProduct(null)
    }
  }

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product)
    setEditingId(product.id)
    setIsDialogOpen(true)
  }

  const openAddDialog = () => {
    setSelectedProduct(null)
    setEditingId(null)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setEditingId(null)
    setSelectedProduct(null)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl">Products</CardTitle>
          </div>
          <Button
            onClick={openAddDialog}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Price</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Quantity</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-border hover:bg-secondary/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-foreground">{product.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                    <td className="py-3 px-4 text-right text-foreground">
                      ₹{product.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-block px-2 py-1 rounded font-medium ${
                          product.quantity > 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.quantity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(product)}
                          className="gap-1 border-border hover:bg-secondary"
                        >
                          <Edit className="w-4 h-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(product.id)}
                          className="gap-1 border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-2">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-border rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      product.quantity > 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {product.quantity}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-foreground">₹{product.price.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(product)}
                      className="gap-1"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(product.id)}
                      className="gap-1 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm ? 'No products found.' : 'No products yet. Add one to get started!'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <ProductDialog
        open={isDialogOpen}
        onOpenChange={closeDialog}
        onSubmit={editingId ? handleEdit : handleAdd}
        product={selectedProduct}
        isEditing={!!editingId}
      />
    </div>
  )
}
