
const list = [
  {
    "name": "documents",
    "type": "directory",
    "size": null,
    "mtime": "2026-01-15T09:23:45Z",
    "path": "/documents",
    "url": "/documents/"
  },
  {
    "name": "photos",
    "type": "directory",
    "size": null,
    "mtime": "2026-02-01T14:30:22Z",
    "path": "/photos",
    "url": "/photos/"
  },
  {
    "name": "report.pdf",
    "type": "file",
    "size": 2457600,
    "mtime": "2026-01-28T11:15:33Z",
    "path": "/report.pdf",
    "url": "/report.pdf"
  },
  {
    "name": "video.mp4",
    "type": "file",
    "size": 157286400,
    "mtime": "2026-02-03T18:45:12Z",
    "path": "/video.mp4",
    "url": "/video.mp4"
  },
  {
    "name": "notes.txt",
    "type": "file",
    "size": 1024,
    "mtime": "2026-02-04T08:12:05Z",
    "path": "/notes.txt",
    "url": "/notes.txt"
  }
]

export default [
  {
    url: /^\/api\/albums\/.*/,
    method: 'post',
    response: ({ body }) => {
        return list
    }
  }
] 