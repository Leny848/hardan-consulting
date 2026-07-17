const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

async function run() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  const { data: tables, error } = await supabase
    .from('site_settings')
    .select('*');

  if (error) {
    console.error('Error fetching site_settings:', error.message);
  } else {
    console.log('site_settings content:', JSON.stringify(tables, null, 2));
  }
}

run();
