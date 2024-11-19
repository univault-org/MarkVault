'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  // Start with null to avoid rendering anything during hydration
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState('light') // Default theme

  useEffect(() => {
    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    setMounted(true)
  }, [])

  // Don't render anything until after hydration
  if (!mounted) return null

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <i className="bi bi-moon-fill text-neutral-600 hover:text-neutral-800" />
      ) : (
        <i className="bi bi-sun-fill text-neutral-300 hover:text-neutral-100" />
      )}
    </button>
  )
}