const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const parts = trimmed.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = value;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

async function run() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  // 1. Read existing content
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'main_content')
    .single();

  if (error) {
    console.error('Error fetching site_settings:', error.message);
    return;
  }

  if (!data || !data.value) {
    console.log('No content found in database.');
    return;
  }

  const content = data.value;
  console.log('Found existing content. Cleaning em-dashes...');

  // Helper sanitization functions
  const cleanDashWithComma = (val) => {
    if (typeof val !== 'string') return val;
    return val.replace(/\s*—\s*/g, ', ').replace(/\s*,\s*,/g, ',');
  };

  const cleanDashWithColon = (val) => {
    if (typeof val !== 'string') return val;
    return val.replace(/\s*—\s*/g, ': ');
  };

  // Clean the fields
  if (content.heroSubtitle) {
    content.heroSubtitle = cleanDashWithComma(content.heroSubtitle);
  }
  if (content.consultantBio) {
    content.consultantBio = cleanDashWithComma(content.consultantBio);
  }
  if (Array.isArray(content.credentials)) {
    content.credentials = content.credentials.map(c => cleanDashWithColon(c));
  }
  if (Array.isArray(content.services)) {
    content.services = content.services.map(s => ({
      ...s,
      description: cleanDashWithComma(s.description)
    }));
  }
  if (Array.isArray(content.certifications)) {
    content.certifications = content.certifications.map(c => ({
      ...c,
      detail: cleanDashWithComma(c.detail)
    }));
  }

  // 2. Write cleaned content back
  const { error: writeError } = await supabase
    .from('site_settings')
    .upsert({
      key: 'main_content',
      value: content,
      updated_at: new Date().toISOString()
    }, { onConflict: 'key' });

  if (writeError) {
    console.error('Error writing cleaned content back to Supabase:', writeError.message);
  } else {
    console.log('Successfully updated Supabase database with cleaned content (em-dashes removed)!');
  }
}

run();
