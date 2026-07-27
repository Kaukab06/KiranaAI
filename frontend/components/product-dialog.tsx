'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Product } from './products-table'

const CATEGORIES = ['Electronics', 'Groceries', 'Dairy', 'Clothing', 'Books', 'Home', 'Other']

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (product: Omit<Product, 'id'>) => void
  product?: Product | null
  isEditing?: boolean
}

export function ProductDialog({
  open,
  onOpenChange,
  onSubmit,
  product,
  isEditing,
}: ProductDialogProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  useEffect(() => {
    if (product) {
      setName(product.name)
      setCategory(product.category)
      setPrice(product.price.toString())
      setQuantity(product.quantity.toString())
    } else {
      resetForm()
    }
  }, [product, open])

  const resetForm = () => {
    setName('')
    setCategory('')
    setPrice('')
    setQuantity('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !category || !price || !quantity) {
      alert('Please fill all fields')
      return
    }

    onSubmit({
      name,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    })
    
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the product details below.' : 'Fill in the details of the new product.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Product Name
            </label>
            <Input
              type="text"
              placeholder="e.g., Basmati Rice"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Price (₹)</label>
              <Input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
                min="0"
                required
                className="bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
              <Input
                type="number"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                step="1"
                min="0"
                required
                className="bg-white"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isEditing ? 'Update' : 'Add'} Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
