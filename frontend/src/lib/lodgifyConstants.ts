/** Lodgify Book Now Box widget script (load once per app lifetime). */
export const LODGIFY_BOOK_NOW_BOX_SCRIPT_URL =
  'https://app.lodgify.com/book-now-box/stable/renderBookNowBox.js'

/** Lodgify portable search bar script (load once per app lifetime). */
export const LODGIFY_PORTABLE_SEARCH_SCRIPT_URL =
  'https://app.lodgify.com/portable-search-bar/stable/renderPortableSearchBar.js'

/** Default properties listing + booking engine (Spanish). */
export const LODGIFY_PROPERTIES_BASE_URL =
  import.meta.env.VITE_LODGIFY_PROPERTIES_URL ??
  'https://allan-alvarez-d17ba1.lodgify.com/es/propiedades/?sort=price&selectedlocationid=0,49,0,846&city=Carmen%20Beach'
