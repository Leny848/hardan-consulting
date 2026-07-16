import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { blobConfigured, getRequestPassword } from '@/lib/site-content'
import { getCurrentPassword } from '@/lib/remote-content'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BYTES = 4 * 1024 * 1024 // 4MB (under Vercel serverless body limit)

export async function POST(request: Request) {
  try {
    if (!blobConfigured()) {
      return NextResponse.json(
        {
          error:
            'Cloud storage is not set up. In Vercel → Storage → create a Blob store, then redeploy.',
        },
        { status: 503 },
      )
    }

    const password = getRequestPassword(request)
    const expected = await getCurrentPassword()
    if (!password || password !== expected) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const form = await request.formData()
    const file = form.get('file')
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image uploads are allowed' }, { status: 400 })
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: 'Image must be under 4MB. Compress it and try again.' },
        { status: 400 },
      )
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_') || 'upload.png'
    const pathname = `hardan/uploads/${Date.now()}-${safeName}`

    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type,
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('POST /api/upload', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 },
    )
  }
}
