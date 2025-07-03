import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'

const UserProfile = ({ isOpen, onClose }) => {
  const { t } = useTranslation()
  const { user, updateProfile, updatePassword, signOut, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    businessType: ''
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (user?.user_metadata) {
      setProfileData({
        firstName: user.user_metadata.first_name || '',
        lastName: user.user_metadata.last_name || '',
        businessName: user.user_metadata.business_name || '',
        businessType: user.user_metadata.business_type || ''
      })
    }
  }, [user])

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const updates = {
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        business_name: profileData.businessName,
        business_type: profileData.businessType
      }

      const { error } = await updateProfile(updates)
      if (error) {
        setError(error)
      } else {
        setSuccess('Profile updated successfully!')
        setIsEditing(false)
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.')
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    try {
      const { error } = await updatePassword(passwordData.newPassword)
      if (error) {
        setError(error)
      } else {
        setSuccess('Password updated successfully!')
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      setError('Failed to update password. Please try again.')
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      onClose()
    } catch (err) {
      setError('Failed to sign out. Please try again.')
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        className="relative w-full max-w-2xl bg-white dark:bg-neutral-gray-dark rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-neutral-black dark:text-neutral-white">
              Account Settings
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

        {/* Navigation Tabs */}
        <div className="px-6 py-2 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'profile'
                  ? 'border-primary-blue text-primary-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'security'
                  ? 'border-primary-blue text-primary-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Security
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Account Info */}
              <div className="bg-gray-50 dark:bg-neutral-gray-medium rounded-lg p-4">
                <h3 className="text-lg font-semibold text-neutral-black dark:text-neutral-white mb-2">
                  Account Information
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Email:</span> {user?.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Account Created:</span>{' '}
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Email Verified:</span>{' '}
                    <span className={user?.email_confirmed_at ? 'text-green-600' : 'text-orange-600'}>
                      {user?.email_confirmed_at ? 'Yes' : 'Pending verification'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleProfileUpdate}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-neutral-black dark:text-neutral-white">
                      Personal Information
                    </h3>
                    {!isEditing ? (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="text-primary-blue hover:text-primary-blue-dark font-medium"
                      >
                        Edit
                      </button>
                    ) : (
                      <div className="space-x-2">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-primary-blue hover:bg-primary-blue-dark text-white px-4 py-1 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-black dark:text-neutral-white mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleProfileInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-gray-medium text-neutral-black dark:text-neutral-white focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-black dark:text-neutral-white mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-gray-medium text-neutral-black dark:text-neutral-white focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-black dark:text-neutral-white mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={profileData.businessName}
                      onChange={handleProfileInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-gray-medium text-neutral-black dark:text-neutral-white focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-black dark:text-neutral-white mb-2">
                      Business Type
                    </label>
                    <select
                      name="businessType"
                      value={profileData.businessType}
                      onChange={handleProfileInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-gray-medium text-neutral-black dark:text-neutral-white focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-700"
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
                </div>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Change Password */}
              <form onSubmit={handlePasswordUpdate}>
                <h3 className="text-lg font-semibold text-neutral-black dark:text-neutral-white mb-4">
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-black dark:text-neutral-white mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-gray-medium text-neutral-black dark:text-neutral-white focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-black dark:text-neutral-white mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-gray-medium text-neutral-black dark:text-neutral-white focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary-blue hover:bg-primary-blue-dark text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    Update Password
                  </button>
                </div>
              </form>

              {/* Danger Zone */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                  Danger Zone
                </h3>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
                  <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                    Sign out of your account. You'll need to sign in again to access your data.
                  </p>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default UserProfile
