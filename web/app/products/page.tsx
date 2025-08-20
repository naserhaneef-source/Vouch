'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { productService } from '../../lib/api'

interface Product {
  id: string
  title: string
  brand: string
  price: number
  images: string[]
  condition: string
  authenticityStatus: string
  seller: {
    firstName: string
    lastName: string
    isVerified: boolean
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: ''
  })

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productService.getProducts(filters)
      setProducts(response.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Vouch
            </Link>
            <nav className="flex space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-primary-600">
                Dashboard
              </Link>
              <Link href="/sell" className="btn btn-primary">
                Sell
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <select
                    className="input"
                    value={filters.brand}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                  >
                    <option value="">All Brands</option>
                    <option value="Louis Vuitton">Louis Vuitton</option>
                    <option value="Chanel">Chanel</option>
                    <option value="Hermes">Hermes</option>
                    <option value="Gucci">Gucci</option>
                    <option value="Prada">Prada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    className="input"
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="Handbags">Handbags</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Price
                    </label>
                    <input
                      type="number"
                      className="input"
                      placeholder="$0"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Price
                    </label>
                    <input
                      type="number"
                      className="input"
                      placeholder="$10,000"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Authenticated Luxury Items</h1>
              <p className="text-gray-600">{products.length} items found</p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="bg-gray-300 h-48 rounded mb-4"></div>
                    <div className="bg-gray-300 h-4 rounded mb-2"></div>
                    <div className="bg-gray-300 h-4 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Link href="/sell" className="btn btn-primary mt-4">
                  List Your First Item
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                        {product.images?.[0] ? (
                          <img 
                            src={product.images[0]} 
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">
                            {product.brand}
                          </span>
                          {product.authenticityStatus === 'authenticated' && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              ✓ Authenticated
                            </span>
                          )}
                        </div>
                        
                        <h3 className="font-medium text-gray-900 line-clamp-2">
                          {product.title}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price?.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 capitalize">
                            {product.condition}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <span>
                            by {product.seller?.firstName} {product.seller?.lastName}
                          </span>
                          {product.seller?.isVerified && (
                            <span className="ml-1 text-blue-500">✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}