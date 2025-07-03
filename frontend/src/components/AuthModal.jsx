import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { signIn, signUp, resetPassword, loading } = useAuth()
  const [mode, setMode] = useState(initialMode) // 'login', 'signup', 'reset'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    businessName: '',
    businessType: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        businessName: '',
        businessType: ''
      })
      setError('')
      setSuccess('')
      setFieldErrors({})
    }
  }, [isOpen, mode])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
    // Clear field-specific error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors = {}
    let isValid = true

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }

    // Password validation for login and signup
    if (mode === 'login' || mode === 'signup') {
      if (!formData.password) {
        errors.password = 'Password is required'
        isValid = false
      } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long'
        isValid = false
      }
    }

    // Additional validation for signup
    if (mode === 'signup') {
      if (!formData.firstName) {
        errors.firstName = 'First name is required'
        isValid = false
      }
      if (!formData.lastName) {
        errors.lastName = 'Last name is required'
        isValid = false
      }
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password'
        isValid = false
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
        isValid = false
      }
    }

    setFieldErrors(errors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!validateForm()) return

    try {
      if (mode === 'login') {
        const { error } = await signIn(formData.email, formData.password)
        if (error) {
          setError(error)
        } else {
          onClose()
          // Redirect to home page after successful login
          navigate('/home')
        }
      } else if (mode === 'signup') {
        const userData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          business_name: formData.businessName,
          business_type: formData.businessType
        }
        const { error } = await signUp(formData.email, formData.password, userData)
        if (error) {
          setError(error)
        } else {
          setSuccess('Account created successfully! Please check your email to verify your account.')
          setTimeout(() => {
            setMode('login')
            setSuccess('')
          }, 3000)
        }
      } else if (mode === 'reset') {
        const { error } = await resetPassword(formData.email)
        if (error) {
          setError(error)
        } else {
          setSuccess('Password reset email sent! Please check your inbox.')
          setTimeout(() => {
            setMode('login')
            setSuccess('')
          }, 3000)
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          className="relative w-full max-w-md bg-white dark:bg-neutral-gray-dark rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-black dark:text-neutral-white">
                {mode === 'login' && 'Welcome Back'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'reset' && 'Reset Password'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-4">
            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md border border-red-200 dark:border-red-700 flex justify-between items-start">
                <p className="text-sm flex-1">{error}</p>
                <button 
                  onClick={() => setError('')}
                  className="ml-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-neutral-black dark:text-neutral-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-neutral-gray-medium text-neutral-black dark:text-neutral-white focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors ${
                    fieldErrors.email 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="your.email@example.com"
                  required
                />
                {fieldErrors.email && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">{fieldErrors.email}</p>
                )}
              </div>

              {/* Password Field */}
              {(mode === 'login' || mode === 'signup') && (
                <div>
                  <label className="block text-sm font-medium text-neutral-black dark:text-neutral-white mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-neutral-gray-medium text-neutral-black dark:text-neutral-white focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors ${
                      fieldErrors.password 
                        ? 'border-red-500 dark:border-red-400' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  {fieldErrors.password && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{fieldErrors.password}</p>
                  )}
                </div>
              )}

              {/* Confirm Password Field */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-black dark:text-neutral-white mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-neutral-gray-medium text-neutral-black dark:text-neutral-white focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors ${
                      fieldErrors.confirmPassword 
                        ? 'border-red-500 dark:border-red-400' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Confirm your password"
                    required
                  />
                  {fieldErrors.confirmPassword && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{fieldErrors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Signup Additional Fields */}
              {mode === 'signup' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-black dark:text-neutral-white mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-neutral-gray-medium text-neutral-black dark:text-neutral-white focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors ${
                          fieldErrors.firstName 
                            ? 'border-red-500 dark:border-red-400' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="John"
                        required
                      />
                      {fieldErrors.firstName && (
                        <p className="text-red-600 dark:text-red-400 text-sm mt-1">{fieldErrors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-black dark:text-neutral-white mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-neutral-gray-medium text-neutral-black dark:text-neutral-white focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors ${
                          fieldErrors.lastName 
                            ? 'border-red-500 dark:border-red-400' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Doe"
                        required
                      />
                      {fieldErrors.lastName && (
                        <p className="text-red-600 dark:text-red-400 text-sm mt-1">{fieldErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-black dark:text-neutral-white mb-2">
                      Business Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-gray-medium text-neutral-black dark:text-neutral-white focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors"
                      placeholder="Your Business Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-black dark:text-neutral-white mb-2">
                      Business Type (Optional)
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-gray-medium text-neutral-black dark:text-neutral-white focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors"
                    >
                      <option value="">Select business type</option>
                      <option value="retail">Retail</option>
                      <option value="services">Services</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="technology">Technology</option>
                      <option value="food">Food & Beverage</option>
                      <option value="hospitality">Hospitality</option>
                    </select>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-blue hover:bg-primary-blue-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    {mode === 'login' && 'Sign In'}
                    {mode === 'signup' && 'Create Account'}
                    {mode === 'reset' && 'Send Reset Email'}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-sm space-y-2">
              {mode === 'login' && (
                <>
                  <button
                    onClick={() => setMode('reset')}
                    className="text-primary-blue hover:text-primary-blue-dark transition-colors"
                  >
                    Forgot your password?
                  </button>
                  <div className="text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <button
                      onClick={() => setMode('signup')}
                      className="text-primary-blue hover:text-primary-blue-dark font-medium transition-colors"
                    >
                      Sign up
                    </button>
                  </div>
                </>
              )}
              
              {mode === 'signup' && (
                <div className="text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="text-primary-blue hover:text-primary-blue-dark font-medium transition-colors"
                  >
                    Sign in
                  </button>
                </div>
              )}
              
              {mode === 'reset' && (
                <div className="text-gray-600 dark:text-gray-400">
                  Remember your password?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="text-primary-blue hover:text-primary-blue-dark font-medium transition-colors"
                  >
                    Back to sign in
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AuthModal 