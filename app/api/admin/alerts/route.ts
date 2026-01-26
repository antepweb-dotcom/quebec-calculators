import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const ALERTS_PATH = path.join(process.cwd(), 'public', 'alerts-config.json')

// Initialize alerts config if it doesn't exist
function initAlertsConfig() {
  if (!fs.existsSync(ALERTS_PATH)) {
    const defaultConfig = {
      enabled: false,
      message: '',
      color: 'info',
      updatedAt: new Date().toISOString()
    }
    fs.writeFileSync(ALERTS_PATH, JSON.stringify(defaultConfig, null, 2))
  }
}

export async function GET() {
  try {
    initAlertsConfig()
    const data = fs.readFileSync(ALERTS_PATH, 'utf8')
    const config = JSON.parse(data)
    return NextResponse.json(config)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read alerts config' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const updatedConfig = {
      ...body,
      updatedAt: new Date().toISOString()
    }
    
    fs.writeFileSync(ALERTS_PATH, JSON.stringify(updatedConfig, null, 2))
    
    return NextResponse.json({ success: true, config: updatedConfig })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update alerts config' }, { status: 500 })
  }
}
