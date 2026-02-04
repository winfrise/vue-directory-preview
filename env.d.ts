/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 所有自定义环境变量必须以 VITE_ 开头
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_TIMEOUT?: string
  // 可继续添加...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}