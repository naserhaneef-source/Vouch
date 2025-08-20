'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/login')
      return
    }
    
    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
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
            <nav className="flex items-center space-x-4">
              <Link href="/products" className="text-gray-600 hover:text-primary-600">
                Browse
              </Link>
              <Link href="/sell" className="text-gray-600 hover:text-primary-600">
                Sell
              </Link>
              <div className="relative">
                <button 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-primary-600"
                >
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your listings, purchases, and account settings
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'listings', name: 'My Listings' },
              { id: 'purchases', name: 'My Purchases' },
              { id: 'sales', name: 'My Sales' },
              { id: 'profile', name: 'Profile' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Active Listings</h3>
              <p className="text-3xl font-bold text-primary-600">0</p>
              <p className="text-sm text-gray-500">Items for sale</p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Total Sales</h3>
              <p className="text-3xl font-bold text-green-600">$0</p>
              <p className="text-sm text-gray-500">Revenue earned</p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Purchases</h3>
              <p className="text-3xl font-bold text-blue-600">0</p>
              <p className="text-sm text-gray-500">Items bought</p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Account Status</h3>
              <p className="text-sm font-medium text-gray-900">
                {user.isVerified ? (
                  <span className="text-green-600">✓ Verified</span>
                ) : (
                  <span className="text-yellow-600">⚠ Pending Verification</span>
                )}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="card">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-4">No Active Listings</h3>
              <p className="text-gray-500 mb-6">
                You haven't listed any items yet. Start selling your luxury items today!
              </p>
              <Link href="/sell" className="btn btn-primary">
                Create Your First Listing
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'purchases' && (
          <div className="card">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-4">No Purchases Yet</h3>
              <p className="text-gray-500 mb-6">
                You haven't made any purchases yet. Browse our authenticated luxury items!
              </p>
              <Link href="/products" className="btn btn-primary">
                Start Shopping
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="card">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-4">No Sales Yet</h3>
              <p className="text-gray-500 mb-6">
                You haven't sold any items yet. List your luxury items to start earning!
              </p>
              <Link href="/sell" className="btn btn-primary">
                List an Item
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="card max-w-2xl">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Profile Information</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={user.firstName}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={user.lastName}
                    readOnly
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="input"
                  value={user.email}
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Status
                </label>
                <div className="flex items-center space-x-2">
                  {user.isVerified ? (
                    <>
                      <span className="text-green-600">✓</span>
                      <span className="text-green-600 font-medium">Verified</span>
                    </>
                  ) : (
                    <>
                      <span className="text-yellow-600">⚠</span>
                      <span className="text-yellow-600 font-medium">Pending Verification</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}