import { NextResponse } from 'next/server'
import { blobConfigured } from '@/lib/site-content'
import { DEFAULT_CONTENT } from '@/lib/site-content'
import { getCurrentPassword, readRemoteContent, writeRemoteContent } from '@/lib/remote-content'
import { getRequestPassword, normalizeContent } from '@/lib/site-content'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    if (!blobConfigured()) {
      return NextResponse.json({
        mode: 'local',
        content: DEFAULT_CONTENT,
        message: 'Vercel Blob not configured — using built-in defaults.',
      })
    }

    const remote = await readRemoteContent()
    return NextResponse.json({
      mode: 'cloud',
      content: remote || DEFAULT_CONTENT,
    })
  } catch (error) {
    console.error('GET /api/content', error)
    return NextResponse.json({
      mode: 'local',
      content: DEFAULT_CONTENT,
      message: 'Could not load cloud content — using defaults.',
    })
  }
}

export async function PUT(request: Request) {
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

    const body = await request.json()
    const content = normalizeContent(body)
    // Keep password change if provided in body
    await writeRemoteContent(content)

    return NextResponse.json({ ok: true, mode: 'cloud', content })
  } catch (error) {
    console.error('PUT /api/content', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Save failed' },
      { status: 500 },
    )
  }
}
