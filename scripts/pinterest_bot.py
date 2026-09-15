"""
NESTORA PINTEREST AUTO-PIN BOT
===============================
Automatically posts / saves 5 curated home decor, kitchen, beauty, and printable photos
to Pinterest daily with rich SEO descriptions, trending hashtags, and Amazon affiliate links.

Usage:
  python scripts/pinterest_bot.py --run-once   # Generate and post today's 5 pins immediately
  python scripts/pinterest_bot.py --status     # View bot statistics and history
  python scripts/pinterest_bot.py --daemon     # Run continuously, posting 5 pins every 24h
"""

import os
import sys
import json
import time
import random
import urllib.parse
from datetime import datetime

# Ensure clean UTF-8 printing on Windows console
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass


# Load environment variables from .env.local if present
def load_env_file():
    env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env.local')
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    os.environ.setdefault(k.strip(), v.strip())

load_env_file()

AFFILIATE_TAG = os.environ.get('NEXT_PUBLIC_AMAZON_AFFILIATE_TAG', 'amzfinds063-20')
AMAZON_DOMAIN = os.environ.get('NEXT_PUBLIC_AMAZON_DOMAIN', 'www.amazon.com')
PINTEREST_TOKEN = os.environ.get('PINTEREST_ACCESS_TOKEN', '')
PINTEREST_BOARD_ID = os.environ.get('PINTEREST_BOARD_ID', '')
SITE_URL = os.environ.get('NEXT_PUBLIC_SITE_URL', 'https://nestora.com')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CATALOG_FILE = os.path.join(BASE_DIR, 'pinterest_catalog.json')
HISTORY_FILE = os.path.join(BASE_DIR, 'pinterest_history.json')
TODAY_FILE = os.path.join(BASE_DIR, 'today_pins.json')

HASHTAG_POOLS = {
    'Kitchen': ['#KitchenDesign', '#CookwareDeals', '#KitchenIdeas', '#AmazonKitchen', '#AmazonFinds', '#KitchenInspo', '#HomeChef'],
    'Beauty & Skincare': ['#SkincareRoutine', '#SelfCareAesthetic', '#BeautyTools', '#GuaSha', '#AmazonBeauty', '#VanityDecor'],
    'Printable Planners': ['#PrintablePlanner', '#MealPlanner', '#BudgetTracker', '#StationeryLove', '#HomeOrganization', '#Printables'],
    'Bedroom': ['#JapandiBedroom', '#CozyBedroom', '#BedroomAesthetic', '#LinenBedding', '#NeutralHome', '#BedroomInspo'],
    'Living Room': ['#LivingRoomIdeas', '#ModernLivingRoom', '#SofaStyling', '#WarmMinimalism', '#HomeDecor', '#CoffeeTableDecor'],
    'Lighting': ['#LightingDesign', '#PendantLight', '#WarmLighting', '#Chandelier', '#AestheticLighting', '#HomeAmbiance'],
    'Decor': ['#HomeDecorIdeas', '#AestheticHome', '#WallArtInspo', '#MacrameDecor', '#CandleAesthetic', '#AmazonHomeFinds']
}

DEFAULT_HASHTAGS = ['#HomeDecor', '#AmazonFinds', '#AestheticHome', '#AmazonDeals', '#InteriorInspo', '#HomeStyling']

def get_history():
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            return {'posted_ids': [], 'history': []}
    return {'posted_ids': [], 'history': []}

def save_history(history):
    with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(history, f, indent=2, ensure_ascii=False)

def build_amazon_link(title):
    clean_title = title.replace('(1)', '').replace('(2)', '').replace('[Cookware]', '').strip()
    return f"https://{AMAZON_DOMAIN}/s?k={urllib.parse.quote(clean_title)}&tag={AFFILIATE_TAG}"

def format_pin_metadata(article):
    title = article['title']
    category = article.get('category', 'Decor')
    excerpt = article.get('excerpt', 'Discover beautiful interior design and home aesthetic inspiration.')
    hero_image = article['heroImage']
    slug = article.get('slug', '')
    
    # Destination link pointing to Nestora article page FIRST (so visitors land on website before Amazon)
    article_link = f"{SITE_URL}/article/{slug}?ref=pinterest"
    amazon_link = build_amazon_link(title)
    dest_link = article_link
    
    # Generate Catchy Title
    clean_title = title.split('(')[0].split('[')[0].strip()
    pin_title = f"{clean_title} - Aesthetic Ideas & Amazon Deals"
    if len(pin_title) > 95:
        pin_title = pin_title[:95]

    # Pick relevant hashtags
    cat_tags = HASHTAG_POOLS.get(category, DEFAULT_HASHTAGS)
    selected_tags = random.sample(cat_tags, min(4, len(cat_tags))) + ['#AmazonFinds', '#HomeDecor']
    tag_str = ' '.join(set(selected_tags))

    # Rich Description
    pin_description = (
        f"Looking for inspiration for {clean_title}? {excerpt} "
        f"Shop top-rated {clean_title} on Amazon with up to 20% discount. "
        f"Find deals & explore more curated home lookbooks on Nestora. "
        f"\n\n{tag_str}"
    )

    # 1-Click Pinterest Pin Web URL (points to your website first!)
    one_click_url = (
        f"https://pinterest.com/pin/create/button/"
        f"?url={urllib.parse.quote(article_link)}"
        f"&media={urllib.parse.quote(hero_image)}"
        f"&description={urllib.parse.quote(pin_description)}"
    )

    return {
        'id': article['id'],
        'slug': slug,
        'clean_title': clean_title,
        'title': pin_title,
        'description': pin_description,
        'image_url': hero_image,
        'destination_url': article_link,
        'article_url': article_link,
        'amazon_url': amazon_link,
        'category': category,
        'one_click_url': one_click_url,
        'created_at': datetime.now().isoformat()
    }

def post_pin_via_api(pin_data):
    """Post pin using official Pinterest API v5 if token & board are set"""
    if not PINTEREST_TOKEN or not PINTEREST_BOARD_ID:
        return {'success': False, 'reason': 'API credentials not set (Token or Board ID missing)'}
    
    try:
        import requests
        url = "https://api.pinterest.com/v5/pins"
        headers = {
            "Authorization": f"Bearer {PINTEREST_TOKEN}",
            "Content-Type": "application/json"
        }
        payload = {
            "board_id": PINTEREST_BOARD_ID,
            "title": pin_data['title'],
            "description": pin_data['description'],
            "link": pin_data['destination_url'],
            "media_source": {
                "source_type": "image_url",
                "url": pin_data['image_url']
            }
        }
        resp = requests.post(url, json=payload, headers=headers, timeout=20)
        if resp.status_code in [200, 201]:
            data = resp.json()
            pin_id = data.get('id', '')
            return {
                'success': True,
                'pin_id': pin_id,
                'pin_url': f"https://www.pinterest.com/pin/{pin_id}/" if pin_id else ""
            }
        else:
            return {'success': False, 'status_code': resp.status_code, 'response': resp.text}
    except Exception as e:
        return {'success': False, 'error': str(e)}

def select_daily_5_pins():
    if not os.path.exists(CATALOG_FILE):
        print(f"[Error] Catalog file not found at {CATALOG_FILE}")
        return []

    with open(CATALOG_FILE, 'r', encoding='utf-8') as f:
        catalog = json.load(f)

    history = get_history()
    posted_ids = set(history.get('posted_ids', []))

    # Filter available articles not yet posted
    available = [item for item in catalog if item['id'] not in posted_ids]
    if len(available) < 5:
        # Reset cycle if we ran out of 1,700+ articles
        print("[Notice] All catalog photos posted! Resetting cycle for fresh resharing...")
        posted_ids.clear()
        available = catalog

    # Select 5 diverse items
    categories = list(set(item.get('category', 'Decor') for item in available))
    random.shuffle(categories)

    selected = []
    for cat in categories:
        cat_items = [item for item in available if item.get('category') == cat and item not in selected]
        if cat_items:
            selected.append(random.choice(cat_items))
        if len(selected) == 5:
            break

    # If still less than 5, fill with random available
    while len(selected) < 5 and available:
        choice = random.choice(available)
        if choice not in selected:
            selected.append(choice)

    # Format into rich pin objects
    pins = [format_pin_metadata(item) for item in selected]
    return pins

def run_daily_job():
    print("\n" + "="*60)
    print(f"🤖 NESTORA PINTEREST AUTO-PIN BOT - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*60)
    print(f"Tracking Tag: {AFFILIATE_TAG} | Amazon Domain: {AMAZON_DOMAIN}")

    pins = select_daily_5_pins()
    if not pins:
        print("[Error] No pins could be selected.")
        return

    history = get_history()
    results = []

    print(f"\n📌 Processing {len(pins)} Daily Pinterest Photos:")
    for idx, pin in enumerate(pins, 1):
        print(f"\n--- Pin #{idx}: {pin['clean_title']} ({pin['category']}) ---")
        print(f"📷 Image: {pin['image_url'][:75]}...")
        print(f"🔗 Affiliate Link: {pin['destination_url']}")

        api_result = post_pin_via_api(pin)
        if api_result.get('success'):
            print(f"✅ Auto-posted via Pinterest API: {api_result.get('pin_url')}")
            pin['status'] = 'posted_api'
            pin['pin_url'] = api_result.get('pin_url')
        else:
            reason = api_result.get('reason', api_result.get('response', 'Ready for 1-click Pin'))
            print(f"⭐ Prepared for 1-Click Pin: {reason}")
            print(f"👉 Direct Pin URL: {pin['one_click_url'][:80]}...")
            pin['status'] = 'ready_1click'

        # Record in history
        history['posted_ids'].append(pin['id'])
        history.setdefault('history', []).append(pin)
        results.append(pin)

    # Save history and today's batch
    save_history(history)
    with open(TODAY_FILE, 'w', encoding='utf-8') as f:
        json.dump({
            'date': datetime.now().strftime('%Y-%m-%d'),
            'total_posted_all_time': len(history['posted_ids']),
            'pins': results
        }, f, indent=2, ensure_ascii=False)

    print("\n" + "="*60)
    print(f"🎉 SUCCESS: 5 Pins processed for today!")
    print(f"Saved today's queue in: scripts/today_pins.json")
    print(f"Total pins posted so far: {len(history['posted_ids'])}")
    print("="*60 + "\n")

def show_status():
    history = get_history()
    total_posted = len(history.get('posted_ids', []))
    catalog_total = 0
    if os.path.exists(CATALOG_FILE):
        with open(CATALOG_FILE, 'r', encoding='utf-8') as f:
            catalog_total = len(json.load(f))

    print("\n" + "="*50)
    print("📊 NESTORA PINTEREST BOT STATUS")
    print("="*50)
    print(f"Total Available Photos in Catalog: {catalog_total}")
    print(f"Total Photos Pinned So Far:       {total_posted}")
    print(f"Remaining Fresh Photos:           {max(0, catalog_total - total_posted)}")
    print(f"Daily Target:                     5 Pins / Day")
    print(f"Amazon Associate Tag:             {AFFILIATE_TAG}")
    print(f"Pinterest API Token Configured:   {'YES' if PINTEREST_TOKEN else 'NO (Running in 1-Click Mode)'}")
    print(f"Pinterest Board ID Configured:    {'YES' if PINTEREST_BOARD_ID else 'NO'}")
    print("="*50 + "\n")

def run_daemon():
    print("🚀 Starting Nestora Pinterest Bot Daemon (Runs every 24 hours)...")
    print("Press Ctrl+C to stop.")
    while True:
        try:
            run_daily_job()
            print("⏳ Sleeping for 24 hours until next batch...")
            time.sleep(24 * 60 * 60)
        except KeyboardInterrupt:
            print("\n🛑 Pinterest Bot stopped by user.")
            break
        except Exception as e:
            print(f"[Error in daemon loop]: {e}")
            time.sleep(300)

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--status':
        show_status()
    elif len(sys.argv) > 1 and sys.argv[1] == '--daemon':
        run_daemon()
    else:
        run_daily_job()
