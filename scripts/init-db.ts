/**
 * Database Initialization Script
 * 
 * Run this script once to set up the database schema.
 * 
 * Usage:
 *   npx tsx scripts/init-db.ts
 */

import { sql } from '@vercel/postgres';

async function initializeDatabase() {
  console.log('🚀 Starting database initialization...\n');

  try {
    // Create page_views table
    console.log('📊 Creating page_views table...');
    await sql`
      CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        path VARCHAR(500) NOT NULL,
        timestamp TIMESTAMP DEFAULT NOW(),
        user_agent TEXT,
        referrer TEXT,
        country VARCHAR(2),
        device VARCHAR(50)
      )
    `;
    console.log('✅ page_views table created\n');

    // Create indexes for page_views
    console.log('🔍 Creating indexes for page_views...');
    await sql`CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp)`;
    console.log('✅ Indexes created\n');

    // Create ad_clicks table
    console.log('💰 Creating ad_clicks table...');
    await sql`
      CREATE TABLE IF NOT EXISTS ad_clicks (
        id SERIAL PRIMARY KEY,
        ad_slot VARCHAR(100) NOT NULL,
        path VARCHAR(500) NOT NULL,
        timestamp TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ ad_clicks table created\n');

    // Create indexes for ad_clicks
    console.log('🔍 Creating indexes for ad_clicks...');
    await sql`CREATE INDEX IF NOT EXISTS idx_ad_clicks_slot ON ad_clicks(ad_slot)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_ad_clicks_timestamp ON ad_clicks(timestamp)`;
    console.log('✅ Indexes created\n');

    // Create site_settings table
    console.log('⚙️  Creating site_settings table...');
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INTEGER PRIMARY KEY DEFAULT 1,
        ads_enabled BOOLEAN DEFAULT true,
        adsense_id VARCHAR(100),
        alert_active BOOLEAN DEFAULT false,
        alert_message TEXT,
        alert_type VARCHAR(20) DEFAULT 'info',
        updated_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT check_id CHECK (id = 1)
      )
    `;
    console.log('✅ site_settings table created\n');

    // Insert default settings
    console.log('📝 Inserting default settings...');
    await sql`
      INSERT INTO site_settings (id, ads_enabled, adsense_id, alert_active, alert_message, alert_type)
      VALUES (1, true, 'ca-pub-2733523563879283', false, '', 'info')
      ON CONFLICT (id) DO NOTHING
    `;
    console.log('✅ Default settings inserted\n');

    console.log('🎉 Database initialization completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   - page_views table: ✅');
    console.log('   - ad_clicks table: ✅');
    console.log('   - site_settings table: ✅');
    console.log('   - Indexes: ✅');
    console.log('   - Default data: ✅');
    console.log('\n✨ Your database is ready to use!');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

// Run initialization
initializeDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
