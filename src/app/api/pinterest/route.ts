import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

const SCRIPTS_DIR = path.join(process.cwd(), 'scripts');
const TODAY_FILE = path.join(SCRIPTS_DIR, 'today_pins.json');
const HISTORY_FILE = path.join(SCRIPTS_DIR, 'pinterest_history.json');
const CATALOG_FILE = path.join(SCRIPTS_DIR, 'pinterest_catalog.json');

export async function GET() {
  try {
    let todayData = { pins: [], date: '', total_posted_all_time: 0 };
    let historyData = { posted_ids: [], history: [] };
    let catalogCount = 0;

    if (fs.existsSync(TODAY_FILE)) {
      todayData = JSON.parse(fs.readFileSync(TODAY_FILE, 'utf-8'));
    }
    if (fs.existsSync(HISTORY_FILE)) {
      historyData = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
    }
    if (fs.existsSync(CATALOG_FILE)) {
      const catalog = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf-8'));
      catalogCount = catalog.length;
    }

    return NextResponse.json({
      success: true,
      today: todayData,
      total_catalog: catalogCount,
      total_posted: historyData.posted_ids ? historyData.posted_ids.length : 0,
      affiliate_tag: process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || 'amzfinds063-20',
      has_api_token: !!process.env.PINTEREST_ACCESS_TOKEN,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const scriptPath = path.join(SCRIPTS_DIR, 'pinterest_bot.py');
    const { stdout, stderr } = await execPromise(`python "${scriptPath}" --run-once`, {
      cwd: process.cwd(),
      timeout: 30000,
    });

    let todayData = { pins: [] };
    if (fs.existsSync(TODAY_FILE)) {
      todayData = JSON.parse(fs.readFileSync(TODAY_FILE, 'utf-8'));
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully generated and processed 5 pins for today!',
      output: stdout,
      today: todayData,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
