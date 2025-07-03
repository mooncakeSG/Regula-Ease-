import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from './AuthModal'

const AuthLanding = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isAuthenticated, loading } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('signup')

  // Note: Routing is now handled by the main App component

  const handleAuthClick = (mode) => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-white via-blue-50 to-neutral-white dark:from-neutral-gray-dark dark:via-neutral-gray-medium dark:to-neutral-gray-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-neutral-gray-medium dark:text-neutral-white/70">Loading...</p>
        </div>
      </div>
    )
  }

  const benefits = [
    {
      icon: '🏢',
      title: 'Personalized Business Support',
      description: 'Get tailored compliance advice based on your specific business type and industry'
    },
    {
      icon: '📋',
      title: 'Track Your Progress',
      description: 'Save your compliance checklist progress and never lose track of important tasks'
    },
    {
      icon: '🎯',
      title: 'Custom Recommendations',
      description: 'Receive personalized recommendations for skills development and business growth'
    },
    {
      icon: '💬',
      title: 'Priority AI Support',
      description: 'Get faster responses and more detailed guidance from our AI business assistant'
    },
    {
      icon: '📊',
      title: 'Business Analytics',
      description: 'Access insights about your business compliance status and improvement areas'
    },
    {
      icon: '🔔',
      title: 'Important Updates',
      description: 'Stay informed about new regulations and compliance requirements for your industry'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Mthembu',
      business: 'Durban Catering Services',
      image: '👩🏾‍💼',
      text: 'RegulaEase helped me navigate the complex world of small business compliance. The personalized checklist saved me weeks of research!'
    },
    {
      name: 'Johan van der Merwe',
      business: 'Cape Town Tech Solutions',
      image: '👨🏼‍💻',
      text: 'The AI assistant understands South African business requirements perfectly. It\'s like having a business consultant available 24/7.'
    },
    {
      name: 'Nomsa Khumalo',
      business: 'Johannesburg Retail Hub',
      image: '👩🏿‍💼',
      text: 'Creating my business profile helped me identify compliance gaps I didn\'t even know existed. Highly recommended!'
    }
  ]

  const stats = [
    { number: '1000+', label: 'Businesses Helped' },
    { number: '95%', label: 'Compliance Success Rate' },
    { number: '24/7', label: 'AI Support Available' },
    { number: '4', label: 'Languages Supported' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-white via-blue-50 to-neutral-white dark:from-neutral-gray-dark dark:via-neutral-gray-medium dark:to-neutral-gray-dark">
      {/* Hero Section */}
      <div className="container-max pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center bg-primary-blue/10 dark:bg-primary-blue/20 px-4 py-2 rounded-full mb-6">
              <span className="text-primary-blue font-medium">🇿🇦 Made for South African SMMEs</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-black dark:text-neutral-white mb-6 leading-tight">
              Unlock Your Business{' '}
              <span className="text-primary-blue drop-shadow-glow dark:drop-shadow-glow-dark">
                Potential
              </span>
            </h1>
            
            <p className="text-xl text-neutral-gray-medium dark:text-neutral-white/70 mb-8 max-w-2xl">
              Join thousands of South African entrepreneurs who trust RegulaEase for personalized 
              business compliance guidance, AI-powered support, and growth opportunities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={() => handleAuthClick('signup')}
                className="bg-primary-blue hover:bg-primary-blue-dark text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
              </motion.button>
              
              <motion.button
                onClick={() => handleAuthClick('login')}
                className="border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <span className="text-neutral-gray-medium dark:text-neutral-white/70">
                  4.9/5 rating
                </span>
              </div>
              <div className="text-neutral-gray-medium dark:text-neutral-white/70">
                🔒 100% Secure & Private
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Dashboard Preview */}
            <div className="relative bg-white dark:bg-neutral-gray-dark rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-6 flex items-center px-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400">regulaease.co/dashboard</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-black dark:text-neutral-white">
                    Welcome back, Sarah! 👋
                  </h3>
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm">
                    87% Complete
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium text-neutral-black dark:text-neutral-white mb-2">
                    Your Business Compliance
                  </h4>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary-blue h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-primary-blue">12</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Tasks Complete</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">2</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Pending Actions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-primary-blue text-white px-4 py-2 rounded-full shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🚀 AI Powered
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              ✅ Compliant
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary-blue/5 dark:bg-primary-blue/10 py-16">
        <div className="container-max">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-gray-medium dark:text-neutral-white/70">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="why-choose" className="py-20">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-black dark:text-neutral-white mb-4">
              Why Choose RegulaEase?
            </h2>
            <p className="text-xl text-neutral-gray-medium dark:text-neutral-white/70 max-w-3xl mx-auto">
              Discover the benefits of joining our community of successful South African entrepreneurs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-gray-dark rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-neutral-black dark:text-neutral-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-neutral-gray-medium dark:text-neutral-white/70">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="bg-gradient-to-r from-primary-blue/5 to-blue-100/50 dark:from-primary-blue/10 dark:to-blue-900/20 py-20">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-black dark:text-neutral-white mb-4">
              Trusted by South African Entrepreneurs
            </h2>
            <p className="text-xl text-neutral-gray-medium dark:text-neutral-white/70">
              See what our community has to say about RegulaEase
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-gray-dark rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <div className="font-semibold text-neutral-black dark:text-neutral-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-neutral-gray-medium dark:text-neutral-white/70">
                      {testimonial.business}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-gray-medium dark:text-neutral-white/70 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div id="ready-transform" className="py-20">
        <div className="container-max">
          <div className="bg-gradient-to-r from-primary-blue to-blue-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of South African entrepreneurs who trust RegulaEase for their business success
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => handleAuthClick('signup')}
                className="bg-white text-primary-blue hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Free Account
              </motion.button>
              
              <div className="flex items-center gap-2 text-white/90">
                <span>✓ No credit card required</span>
                <span>•</span>
                <span>✓ Setup in 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  )
}

export default AuthLanding
