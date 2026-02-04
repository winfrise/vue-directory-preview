/**
 * 判断是否为图片文件（常见格式）
 */
export function isImage(filename: string): boolean {
  if (!filename) return false
  const ext = filename.split('.').pop()?.toLowerCase()
  return ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg'].includes(ext || '')
}

/**
 * 判断是否为 PNG 文件
 */
export function isPng(filename: string): boolean {
  if (!filename) return false
  return filename.toLowerCase().endsWith('.png')
}

/**
 * 判断是否为 JPG/JPEG 文件
 */
export function isJpg(filename: string): boolean {
  if (!filename) return false
  const lower = filename.toLowerCase()
  return lower.endsWith('.jpg') || lower.endsWith('.jpeg')
}
