import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const CONFIG_PATH = path.join(process.cwd(), 'public', 'ads-config.json')

export async function GET() {
  try {
    const data = fs.readFileSync(CONFIG_PATH, 'utf8')
    const config = JSON.parse(data)
    return NextResponse.json(config)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Update the config file
    const updatedConfig = {
      ...body,
      updatedAt: new Date().toISOString()
    }
    
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(updatedConfig, null, 2))
    
    return NextResponse.json({ success: true, config: updatedConfig })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 })
  }
}
