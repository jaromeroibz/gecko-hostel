import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'selected_extras'

type SelectedExtrasContextValue = {
  selectedExtraIds: number[]
  selectedCount: number
  addExtra: (extraId: number) => void
  removeExtra: (extraId: number) => void
  toggleExtra: (extraId: number) => void
  isSelected: (extraId: number) => boolean
  clearExtras: () => void
}

const SelectedExtrasContext = createContext<SelectedExtrasContextValue | undefined>(undefined)

type SelectedExtrasProviderProps = {
  children: ReactNode
}

function readInitialSelection(): number[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((value): value is number => Number.isInteger(value))
  } catch {
    return []
  }
}

export function SelectedExtrasProvider({ children }: SelectedExtrasProviderProps) {
  const [selectedExtraIds, setSelectedExtraIds] = useState<number[]>(readInitialSelection)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedExtraIds))
  }, [selectedExtraIds])

  const addExtra = useCallback((extraId: number) => {
    setSelectedExtraIds((prev) => (prev.includes(extraId) ? prev : [...prev, extraId]))
  }, [])

  const removeExtra = useCallback((extraId: number) => {
    setSelectedExtraIds((prev) => prev.filter((id) => id !== extraId))
  }, [])

  const toggleExtra = useCallback((extraId: number) => {
    setSelectedExtraIds((prev) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId],
    )
  }, [])

  const clearExtras = useCallback(() => {
    setSelectedExtraIds([])
  }, [])

  const isSelected = useCallback(
    (extraId: number) => selectedExtraIds.includes(extraId),
    [selectedExtraIds],
  )

  const value = useMemo(
    () => ({
      selectedExtraIds,
      selectedCount: selectedExtraIds.length,
      addExtra,
      removeExtra,
      toggleExtra,
      isSelected,
      clearExtras,
    }),
    [selectedExtraIds, addExtra, removeExtra, toggleExtra, isSelected, clearExtras],
  )

  return <SelectedExtrasContext.Provider value={value}>{children}</SelectedExtrasContext.Provider>
}

export function useSelectedExtras() {
  const context = useContext(SelectedExtrasContext)
  if (!context) {
    throw new Error('useSelectedExtras must be used within SelectedExtrasProvider')
  }
  return context
}
