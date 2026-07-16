import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { supabaseConfigured, getRequestPassword } from '@/lib/site-content'
import { getCurrentPassword } from '@/lib/remote-content'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BYTES = 4 * 1024 * 1024 // 4MB

export async function POST(request: Request) {
  try {
    if (!supabaseConfigured() || !supabase) {
      return NextResponse.json(
        {
          error:
            'Cloud storage is not set up. Please set up your Supabase project credentials.',
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
    const pathname = `${Date.now()}-${safeName}`

    // Upload to Supabase Storage bucket 'hardan-uploads'
    const { data, error } = await supabase.storage
      .from('hardan-uploads')
      .upload(pathname, file, {
        contentType: file.type,
        upsert: true,
      })

    if (error) {
      throw new Error(`Supabase Storage upload error: ${error.message}`)
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('hardan-uploads')
      .getPublicUrl(pathname)

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error('POST /api/upload', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 },
    )
  }
}
