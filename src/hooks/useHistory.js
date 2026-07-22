import { useState, useCallback } from 'react'

const STORAGE_KEY = 'qr-history'
const MAX_ITEMS = 10

function loadHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveHistory(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export default function useHistory() {
  const [history, setHistory] = useState(loadHistory)

  const addItem = useCallback((item) => {
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...item,
    }
    setHistory(prev => {
      const next = [entry, ...prev].slice(0, MAX_ITEMS)
      saveHistory(next)
      return next
    })
  }, [])

  const removeItem = useCallback((id) => {
    setHistory(prev => {
      const next = prev.filter(item => item.id !== id)
      saveHistory(next)
      return next
    })
  }, [])

  const clearAll = useCallback(() => {
    setHistory([])
    saveHistory([])
  }, [])

  return { history, addItem, removeItem, clearAll }
}
