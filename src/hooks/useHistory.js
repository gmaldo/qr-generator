import { useState, useCallback, useEffect } from 'react'

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
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // storage full or unavailable — history just won't persist
  }
}

export default function useHistory() {
  const [history, setHistory] = useState(loadHistory)

  // Persist as an effect so state updaters stay pure (StrictMode double-invokes them)
  useEffect(() => {
    saveHistory(history)
  }, [history])

  const addItem = useCallback((item) => {
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...item,
    }
    setHistory(prev => [entry, ...prev].slice(0, MAX_ITEMS))
  }, [])

  const removeItem = useCallback((id) => {
    setHistory(prev => prev.filter(item => item.id !== id))
  }, [])

  const clearAll = useCallback(() => setHistory([]), [])

  return { history, addItem, removeItem, clearAll }
}
