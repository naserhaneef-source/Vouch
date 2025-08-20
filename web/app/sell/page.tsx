'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SellPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    brand: '',
    category: 'Handbags',
    condition: 'like-new',
    price: '',
    originalPrice: '',
    size: '',
    color: '',
    material: '',
    serialNumber: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate submission - in production, this would call the API
    setTimeout(() => {
      alert('Product listing created! (This is a demo - full integration required)')
      setLoading(false)
      router.push('/dashboard')
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
              <Link href="/products" className="text-gray-600 hover:text-primary-600">
                Browse
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">List Your Luxury Item</h1>
          <p className="text-gray-600 mt-2">
            Create a listing for your authenticated luxury item and reach verified buyers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="input"
                  placeholder="e.g., Louis Vuitton Neverfull MM Monogram Canvas"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  className="input"
                  placeholder="Describe your item's condition, history, and any special features..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    required
                    className="input"
                    placeholder="e.g., Louis Vuitton"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    className="input"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Handbags">Handbags</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Clothing">Clothing</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Condition & Details */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Condition & Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition *
                </label>
                <select
                  name="condition"
                  required
                  className="input"
                  value={formData.condition}
                  onChange={handleChange}
                >
                  <option value="new">New with Tags</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Size
                  </label>
                  <input
                    type="text"
                    name="size"
                    className="input"
                    placeholder="e.g., MM, 8.5, One Size"
                    value={formData.size}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    className="input"
                    placeholder="e.g., Monogram, Black"
                    value={formData.color}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Material
                  </label>
                  <input
                    type="text"
                    name="material"
                    className="input"
                    placeholder="e.g., Canvas, Leather"
                    value={formData.material}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Serial Number (if available)
                </label>
                <input
                  type="text"
                  name="serialNumber"
                  className="input"
                  placeholder="Enter serial number for authentication"
                  value={formData.serialNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Price *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="price"
                    required
                    className="input pl-8"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Retail Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="originalPrice"
                    className="input pl-8"
                    placeholder="0.00"
                    value={formData.originalPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Photos Section */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Photos</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-4">
                📷
              </div>
              <p className="text-gray-600 mb-4">
                Upload high-quality photos of your item (coming soon)
              </p>
              <p className="text-sm text-gray-500">
                Professional photos increase your chances of selling quickly
              </p>
            </div>
          </div>

          {/* Authentication Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <div className="text-blue-600 text-2xl mr-3">🛡️</div>
              <div>
                <h3 className="text-lg font-medium text-blue-900 mb-2">
                  Authentication Process
                </h3>
                <p className="text-blue-700 mb-2">
                  All items are subject to third-party authentication before listing becomes active.
                </p>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Professional authentication by certified experts</li>
                  <li>• 24-48 hour turnaround time</li>
                  <li>• Items must pass authentication to be listed</li>
                  <li>• Authentication report provided to buyers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/dashboard" className="btn btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary disabled:opacity-50"
            >
              {loading ? 'Creating Listing...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}