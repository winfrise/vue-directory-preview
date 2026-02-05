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


/**
 * 判断文件是否为视频（通过文件名）
 * @param filename 文件名（如 "movie.mp4"）
 * @returns boolean
 */
export function isVideo(filename: string): boolean {
  if (typeof filename !== 'string') return false;

  const videoExtensions = new Set([
    // 常见视频格式
    'mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm',
    'm4v', '3gp', 'mpeg', 'mpg', 'ts', 'm2ts',
    'vob', 'ogv', 'ogg', 'rm', 'rmvb', 'asf'
  ]);

  const ext = filename.split('.').pop()?.toLowerCase();
  return ext ? videoExtensions.has(ext) : false;
}