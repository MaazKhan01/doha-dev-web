
export function languageSelector(lng, en, ar) {
  if (lng === "ar" && ar) {
    return ar;
  } else  {
    return en;
  }
}
export function imageSelector(lng, en, ar) {
  const selectedUrl = (lng === "ar" && ar) ? ar : en;
  
  // If URL is already complete (starts with http), return as is
  if (selectedUrl && (selectedUrl.startsWith('http://') || selectedUrl.startsWith('https://'))) {
    return selectedUrl;
  }
  
  // Otherwise, prepend API URL for relative paths
  let api_url = process.env.NEXT_PUBLIC_API_URL;
  return selectedUrl ? `${api_url}${selectedUrl}` : selectedUrl;
}

