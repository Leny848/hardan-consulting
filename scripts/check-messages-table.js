const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

async function run() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .limit(1);

  if (error) {
    console.log('Error (probably table does not exist):', error.message);
  } else {
    console.log('Table contact_messages exists, content:', data);
  }
}

run();
