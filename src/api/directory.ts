import { request } from '@/utils/request'

export interface DirectoryItem {
    name: string, 
    type: 'file' | 'directory' 
    mtime: string
}


export const getDirectory = (directory: string) => {
    const url = `/api${directory}/?json`
    return request.get<DirectoryItem[]>(url).then(res => ({data: res.data}))
}