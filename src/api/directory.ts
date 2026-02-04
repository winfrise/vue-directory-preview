import { request } from '@/utils/request'

const API_DIR = '/apiDir'

export interface DirectoryItem {
    name: string, 
    type: 'file' | 'directory' 
    mtime: string
}


export const getDirectory = (directory: string) => {
    const url = `${API_DIR}${directory}/?json`
    return request.get<DirectoryItem[]>(url).then(res => ({data: res.data}))
}