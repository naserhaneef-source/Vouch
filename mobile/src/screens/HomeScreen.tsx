import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Vouch</Text>
          <Text style={styles.subtitle}>Guaranteed Authentic Luxury Resale</Text>
        </View>

        <View style={styles.features}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🔒</Text>
            <Text style={styles.featureTitle}>Secure Escrow</Text>
            <Text style={styles.featureDescription}>
              Your payment is held safely until you receive and approve your item.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>✅</Text>
            <Text style={styles.featureTitle}>Authentication</Text>
            <Text style={styles.featureDescription}>
              Every item is verified by professional authentication services.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📦</Text>
            <Text style={styles.featureTitle}>Safe Shipping</Text>
            <Text style={styles.featureDescription}>
              Tracked and insured shipping with trusted carriers.
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Browse Products</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Start Selling</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    gap: 16,
    marginBottom: 40,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  actions: {
    gap: 16,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  secondaryButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
  },
});