/** Upload modal: optional batch category (empty = leave unset for table / bulk edit). */
export const IMAGE_UPLOAD_BATCH_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Set later' },
  { value: 'general', label: 'General' },
  { value: 'rooms', label: 'Rooms' },
  { value: 'extras', label: 'Extras' },
  { value: 'packages', label: 'Packages' },
  { value: 'hero', label: 'Hero' },
]

/** Predefined image categories (empty string = not set yet). */
export const IMAGE_SELECT_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Not set' },
  { value: 'general', label: 'General' },
  { value: 'rooms', label: 'Rooms' },
  { value: 'extras', label: 'Extras' },
  { value: 'packages', label: 'Packages' },
  { value: 'hero', label: 'Hero' },
]

/** Table / filter: `all`, `_empty` (API token for uncategorized), then each predefined value. */
export const IMAGE_FILTER_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All categories' },
  { value: '_empty', label: 'Not set' },
  { value: 'general', label: 'General' },
  { value: 'rooms', label: 'Rooms' },
  { value: 'extras', label: 'Extras' },
  { value: 'packages', label: 'Packages' },
  { value: 'hero', label: 'Hero' },
]

export function formatImageCategoryLabel(category: string | null | undefined): string {
  const c = category ?? ''
  if (!c.trim()) return 'Not set'
  const opt = IMAGE_SELECT_OPTIONS.find((o) => o.value === c)
  return opt?.label ?? c
}
