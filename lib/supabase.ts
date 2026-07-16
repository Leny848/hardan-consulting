import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          persistSession: false,
        },
      })
    : null

// Verify the connection to Supabase and log status to the console
if (supabase) {
  supabase
    .from('site_settings')
    .select('key')
    .limit(1)
    .then(({ error }) => {
      if (error) {
        console.error('❌ Supabase connection test failed:', error.message)
      } else {
        console.log('✅ Supabase connected successfully!')
      }
    })
    .catch((err) => {
      console.error('❌ Supabase connection test failed with exception:', err)
    })
} else {
  console.warn('⚠️ Supabase client not initialized (missing environment variables)')
}
