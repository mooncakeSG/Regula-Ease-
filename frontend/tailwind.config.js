/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#2563EB',
          'blue-light': '#3B82F6',
          'blue-dark': '#1D4ED8',
        },
        neutral: {
          black: '#000000',
          'gray-dark': '#1A1A1A',
          'gray-medium': '#333333',
          white: '#FFFFFF',
          'gray-light': '#F8F9FA',
        },
        accent: {
          orange: '#FF6B35',
          green: '#10B981',
          blue: '#3B82F6',
          red: '#EF4444',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-hover': 'scaleHover 0.2s ease-in-out',
        'spin-slow': 'spin 12s linear infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'gradient-flow': 'gradientFlow 15s ease infinite',
        'gradient-pulse': 'gradientPulse 10s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleHover: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-30px) scale(1.08)' },
        },
        gradientFlow: {
          '0%, 100%': { 
            backgroundPosition: '0% 50%' 
          },
          '50%': { 
            backgroundPosition: '100% 50%' 
          },
        },
        gradientPulse: {
          '0%, 100%': { 
            backgroundSize: '200% 200%',
            backgroundPosition: 'left center'
          },
          '50%': { 
            backgroundSize: '250% 250%',
            backgroundPosition: 'right center'
          },
        }
      },
      dropShadow: {
        'glow': '0 0 10px rgba(37, 99, 235, 0.7)',
        'glow-strong': '0 0 20px rgba(37, 99, 235, 0.9)',
        'glow-dark': '0 0 10px rgba(59, 130, 246, 0.4)',
        'glow-dark-strong': '0 0 20px rgba(59, 130, 246, 0.6)',
      }
    },
  },
  plugins: [],
}

