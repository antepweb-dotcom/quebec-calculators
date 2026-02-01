// Test environment variables
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Testing Environment Variables\n');
console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD || '❌ NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('\n✅ If ADMIN_PASSWORD shows "145314", you\'re good to go!');
console.log('❌ If it shows "NOT SET", restart your dev server!\n');
