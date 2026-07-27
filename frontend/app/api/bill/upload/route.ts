import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Verify authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    // Get the token
    const token = authHeader.substring(7)
    if (!token) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      )
    }

    // In a real application, you would:
    // 1. Save the file to storage (Vercel Blob, AWS S3, etc.)
    // 2. Send the image to an OCR service (Google Vision, AWS Textract, etc.)
    // 3. Parse the OCR response to extract bill information
    // 4. Save the bill data to a database

    // For demo purposes, we'll return mock data based on file size
    // This simulates different bills based on the image uploaded
    const fileSize = file.size
    const mockBills = [
      {
        storeName: 'Metro Supermarket',
        items: [
          { name: 'Rice (1kg)', quantity: 1, price: 45 },
          { name: 'Wheat Flour (2kg)', quantity: 1, price: 65 },
          { name: 'Cooking Oil (1L)', quantity: 2, price: 120 },
          { name: 'Sugar (500g)', quantity: 1, price: 25 },
          { name: 'Salt (500g)', quantity: 1, price: 10 },
        ],
        totalAmount: 265,
        confidence: 92,
      },
      {
        storeName: 'Local Grocery Store',
        items: [
          { name: 'Milk (1L)', quantity: 2, price: 50 },
          { name: 'Bread (1 loaf)', quantity: 1, price: 35 },
          { name: 'Eggs (12pcs)', quantity: 1, price: 60 },
          { name: 'Butter (100g)', quantity: 1, price: 45 },
        ],
        totalAmount: 240,
        confidence: 88,
      },
      {
        storeName: 'Fresh Market',
        items: [
          { name: 'Tomatoes (1kg)', quantity: 1, price: 30 },
          { name: 'Onions (1kg)', quantity: 1, price: 25 },
          { name: 'Potatoes (2kg)', quantity: 1, price: 35 },
          { name: 'Carrots (500g)', quantity: 1, price: 20 },
          { name: 'Green Chilli (200g)', quantity: 1, price: 15 },
        ],
        totalAmount: 125,
        confidence: 85,
      },
    ]

    // Select a mock bill based on file size for variety
    const selectedBill = mockBills[fileSize % mockBills.length]

    return NextResponse.json(selectedBill)
  } catch (error) {
    console.error('Bill upload error:', error)
    return NextResponse.json(
      { error: 'Failed to process bill' },
      { status: 500 }
    )
  }
}
