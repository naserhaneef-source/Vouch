const axios = require('axios');

class AuthenticationService {
  constructor() {
    this.entruppyApiUrl = process.env.ENTRUPY_API_URL || 'https://api.entrupy.com';
    this.entruppyApiKey = process.env.ENTRUPY_API_KEY;
  }

  // Submit item for authentication via Entrupy API
  async submitForAuthentication(productData) {
    try {
      const payload = {
        item: {
          brand: productData.brand,
          model: productData.title,
          serial_number: productData.serialNumber,
          images: productData.images,
          metadata: {
            description: productData.description,
            condition: productData.condition,
            color: productData.color,
            size: productData.size,
            material: productData.material
          }
        }
      };

      const response = await axios.post(`${this.entruppyApiUrl}/authenticate`, payload, {
        headers: {
          'Authorization': `Bearer ${this.entruppyApiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      });

      return {
        status: 'submitted',
        referenceId: response.data.reference_id,
        estimatedCompletion: response.data.estimated_completion,
        provider: 'entrupy'
      };
    } catch (error) {
      console.error('Entrupy API Error:', error.message);
      
      // Return a mock response for development
      return {
        status: 'pending',
        referenceId: `MOCK_${Date.now()}`,
        estimatedCompletion: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours
        provider: 'entrupy',
        note: 'Mock authentication service - production integration required'
      };
    }
  }

  // Check authentication status
  async getAuthenticationStatus(referenceId) {
    try {
      const response = await axios.get(`${this.entruppyApiUrl}/status/${referenceId}`, {
        headers: {
          'Authorization': `Bearer ${this.entruppyApiKey}`
        }
      });

      return {
        status: response.data.status, // 'pending', 'authenticated', 'rejected'
        result: response.data.result,
        confidence: response.data.confidence,
        report: response.data.report,
        completedAt: response.data.completed_at
      };
    } catch (error) {
      console.error('Entrupy Status Check Error:', error.message);
      
      // Return mock status for development
      return {
        status: 'pending',
        result: null,
        confidence: null,
        report: null,
        completedAt: null,
        note: 'Mock authentication service - production integration required'
      };
    }
  }

  // Webhook handler for authentication updates
  async handleAuthenticationWebhook(payload) {
    try {
      const { reference_id, status, result, confidence, report } = payload;
      
      // Find and update the product with authentication results
      const { Product } = require('../models');
      
      const product = await Product.findOne({
        where: {
          'authenticityReport.referenceId': reference_id
        }
      });

      if (product) {
        await product.update({
          authenticityStatus: status,
          authenticityReport: {
            ...product.authenticityReport,
            status,
            result,
            confidence,
            report,
            completedAt: new Date()
          }
        });

        return { success: true, productId: product.id };
      }

      return { success: false, error: 'Product not found' };
    } catch (error) {
      console.error('Authentication webhook error:', error);
      return { success: false, error: error.message };
    }
  }

  // Alternative authentication providers can be added here
  async submitToAlternativeProvider(productData, provider) {
    // Placeholder for other authentication services
    switch (provider) {
      case 'rebag':
        return this.submitToRebag(productData);
      case 'fashionphile':
        return this.submitToFashionphile(productData);
      default:
        throw new Error(`Authentication provider '${provider}' not supported`);
    }
  }

  // Mock implementation for additional providers
  async submitToRebag(productData) {
    return {
      status: 'pending',
      referenceId: `REBAG_${Date.now()}`,
      estimatedCompletion: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72 hours
      provider: 'rebag',
      note: 'Mock authentication service - integration pending'
    };
  }

  async submitToFashionphile(productData) {
    return {
      status: 'pending',
      referenceId: `FP_${Date.now()}`,
      estimatedCompletion: new Date(Date.now() + 96 * 60 * 60 * 1000), // 96 hours
      provider: 'fashionphile',
      note: 'Mock authentication service - integration pending'
    };
  }
}

module.exports = new AuthenticationService();