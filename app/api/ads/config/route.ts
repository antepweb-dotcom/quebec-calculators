import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'public', 'ads-config.json');

// GET - Reklam config'ini getir
export async function GET() {
  try {
    const fileContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
    const config = JSON.parse(fileContent);
    
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error reading ads config:', error);
    return NextResponse.json(
      { error: 'Failed to load ads configuration' },
      { status: 500 }
    );
  }
}

// POST - Reklam config'ini güncelle (Admin only)
export async function POST(request: Request) {
  try {
    const newConfig = await request.json();
    
    // Timestamp ekle
    newConfig.updatedAt = new Date().toISOString();
    
    // Dosyaya yaz
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(newConfig, null, 2), 'utf-8');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Ads configuration updated successfully',
      config: newConfig
    });
  } catch (error) {
    console.error('Error updating ads config:', error);
    return NextResponse.json(
      { error: 'Failed to update ads configuration' },
      { status: 500 }
    );
  }
}
