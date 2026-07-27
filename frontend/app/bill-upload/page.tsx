'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, X, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface BillItem {
  name: string
  quantity: number
  price: number
}

interface BillData {
  storeName: string
  items: BillItem[]
  totalAmount: number
  confidence: number
}

export default function BillUploadPage() {
  const { user, token, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [billData, setBillData] = useState<BillData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/')
    }
  }, [user, authLoading, router])

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    setSelectedFile(file)
    setError(null)
    setBillData(null)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.add('border-primary', 'bg-primary/5')
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('border-primary', 'bg-primary/5')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove('border-primary', 'bg-primary/5')
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !token) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const response = await fetch('/api/bill/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to upload bill')
      }

      const data = await response.json()
      setBillData(data)
      setSelectedFile(null)
      setPreview(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setSelectedFile(null)
    setPreview(null)
    setBillData(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bill Upload</h1>
          <p className="text-muted-foreground mt-1">Upload a bill image to extract store information and items</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="space-y-4">
            <Card className="p-8">
              {!preview ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-foreground font-semibold mb-1">Drag and drop your bill</p>
                  <p className="text-sm text-muted-foreground">or click to select an image file</p>
                  <p className="text-xs text-muted-foreground mt-2">Supported: JPG, PNG, WebP</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={preview}
                      alt="Bill preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleUpload}
                      disabled={loading}
                      className="flex-1 gap-2"
                    >
                      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {loading ? 'Processing...' : 'Upload & Process'}
                    </Button>
                    <Button
                      onClick={handleClear}
                      variant="outline"
                      disabled={loading}
                      size="icon"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
            </Card>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          {billData && (
            <div className="space-y-4">
              {/* Store Info */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Store Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Store Name</p>
                    <p className="text-lg font-semibold text-foreground">{billData.storeName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Confidence Score</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${billData.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{billData.confidence}%</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Items Table */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Items</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 text-muted-foreground font-medium">Item</th>
                        <th className="text-right py-2 px-3 text-muted-foreground font-medium">Qty</th>
                        <th className="text-right py-2 px-3 text-muted-foreground font-medium">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billData.items.length > 0 ? (
                        billData.items.map((item, idx) => (
                          <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-3 text-foreground">{item.name}</td>
                            <td className="py-3 px-3 text-right text-foreground">{item.quantity}</td>
                            <td className="py-3 px-3 text-right text-foreground">₹{item.price.toFixed(2)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="py-4 px-3 text-center text-muted-foreground">
                            No items found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Total Amount */}
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-foreground">Total Amount</p>
                  <p className="text-3xl font-bold text-primary">₹{billData.totalAmount.toFixed(2)}</p>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button onClick={handleClear} variant="outline" className="flex-1">
                  Upload Another Bill
                </Button>
                <Button className="flex-1">Save to Records</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
