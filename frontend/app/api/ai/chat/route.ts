import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json()

    // Verify authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!question || typeof question !== 'string' || question.trim() === '') {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }

    // Simulate AI response - Replace this with actual AI SDK integration
    // For now, return a mock response based on keywords
    const response = generateMockResponse(question)

    return NextResponse.json({
      response,
      message: 'Success',
    })
  } catch (error) {
    console.error('AI Chat Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

function generateMockResponse(question: string): string {
  const lowerQuestion = question.toLowerCase()

  // Mock responses based on keywords
  if (lowerQuestion.includes('inventory') || lowerQuestion.includes('stock')) {
    return 'To manage your inventory effectively, I recommend:\n\n1. **Regular Stock Audits**: Conduct weekly or bi-weekly inventory checks to ensure accuracy.\n\n2. **Set Reorder Points**: Establish minimum stock levels for each product to avoid stockouts.\n\n3. **Category Organization**: Group similar products together for easier tracking and management.\n\n4. **Track Expiry Dates**: For perishable items, maintain a system to rotate stock based on expiry dates (FIFO method).\n\n5. **Use Our Inventory System**: The Inventory page helps you track all products in real-time with edit and delete capabilities.\n\nWould you like specific tips for any particular product category?'
  }

  if (lowerQuestion.includes('help') || lowerQuestion.includes('how')) {
    return 'I\'m here to help! I can assist you with:\n\n• **Inventory Management**: Tips on stock organization, reorder points, and tracking\n• **Business Tips**: Strategies for growing your Kirana store\n• **Product Recommendations**: Suggestions for popular items\n• **Sales Strategies**: Ideas to boost revenue\n• **Customer Service**: Best practices for customer retention\n\nWhat specific area would you like help with?'
  }

  if (lowerQuestion.includes('sales') || lowerQuestion.includes('revenue')) {
    return 'Here are strategies to increase your sales:\n\n1. **Promotional Offers**: Run seasonal discounts on popular items\n2. **Bundle Deals**: Create combo offers for frequently bought items\n3. **Customer Loyalty**: Implement a rewards program for regular customers\n4. **Quality Products**: Focus on high-quality items to build reputation\n5. **Customer Service**: Provide excellent service to encourage repeat visits\n6. **Inventory Diversity**: Stock items based on customer preferences\n\nWould you like more detailed advice on any of these strategies?'
  }

  if (lowerQuestion.includes('kirana') || lowerQuestion.includes('store')) {
    return 'Welcome to Kirana Dashboard! This platform helps small store owners like you manage their inventory efficiently.\n\nKey Features:\n• **Inventory Tracking**: Manage products with real-time updates\n• **Stock Management**: Add, edit, and delete products easily\n• **Dashboard Analytics**: View key business metrics\n• **AI Assistant**: Get personalized business advice (that\'s me!)\n\nHow can I help you with your store today?'
  }

  // Default response
  return 'That\'s an interesting question! Based on my knowledge of retail and inventory management:\n\nFor your Kirana store, I recommend focusing on:\n• Maintaining accurate inventory records\n• Understanding your customer preferences\n• Managing your cash flow effectively\n• Building strong supplier relationships\n• Providing excellent customer service\n\nFeel free to ask me more specific questions about inventory management, sales strategies, or store operations. I\'m here to help!'
}
