import { request } from '@/utils/request'

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface DirectoryItem {
    name: string, 
    type: 'file' | 'directory' 
    mtime: string
}


export const getDirectory = (directory: string) => {
    if (directory === '/') {
        directory = ''
    }

    const url = `${VITE_API_BASE_URL}${directory}/?json`
    return request.get<DirectoryItem[]>(url).then(res => ({data: res.data}))
}