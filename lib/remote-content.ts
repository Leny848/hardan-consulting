import { list, put } from '@vercel/blob'
import {
  CONTENT_BLOB_PATH,
  DEFAULT_CONTENT,
  blobConfigured,
  normalizeContent,
  type SiteContent,
} from '@/lib/site-content'

export async function readRemoteContent(): Promise<SiteContent | null> {
  if (!blobConfigured()) return null

  const { blobs } = await list({ prefix: CONTENT_BLOB_PATH, limit: 1 })
  const blob = blobs.find((b) => b.pathname === CONTENT_BLOB_PATH) || blobs[0]
  if (!blob?.url) return null

  const res = await fetch(blob.url, { cache: 'no-store' })
  if (!res.ok) return null
  return normalizeContent(await res.json())
}

export async function writeRemoteContent(content: SiteContent) {
  if (!blobConfigured()) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not configured')
  }

  const blob = await put(CONTENT_BLOB_PATH, JSON.stringify(content), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
  })

  return blob
}

export async function getCurrentPassword(): Promise<string> {
  const remote = await readRemoteContent()
  return remote?.adminPassword || DEFAULT_CONTENT.adminPassword
}
