import { supabase } from '@/lib/supabase'
import {
  DEFAULT_CONTENT,
  supabaseConfigured,
  normalizeContent,
  type SiteContent,
} from '@/lib/site-content'

export async function readRemoteContent(): Promise<SiteContent | null> {
  if (!supabaseConfigured() || !supabase) return null

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'main_content')
      .single()

    if (error) {
      console.warn('Supabase read warning:', error.message)
      return null
    }

    if (!data || !data.value) return null

    return normalizeContent(data.value)
  } catch (error) {
    console.error('Failed to read remote content from Supabase:', error)
    return null
  }
}

export async function writeRemoteContent(content: SiteContent) {
  if (!supabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured')
  }

  const { data, error } = await supabase
    .from('site_settings')
    .upsert(
      {
        key: 'main_content',
        value: content,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'key' }
    )
    .select()

  if (error) {
    throw new Error(`Error writing to Supabase: ${error.message}`)
  }

  return data
}

export async function getCurrentPassword(): Promise<string> {
  const remote = await readRemoteContent()
  return remote?.adminPassword || DEFAULT_CONTENT.adminPassword
}
