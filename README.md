<!-- trunk-ignore(prettier) -->
# 📹 Video Wiki

A wiki-style video player with full-screen playback, speed controls, and zero dependencies. Upload videos, no login required.

## Features

✅ **Wiki-like Interface** - Clean, minimal design inspired by Wikipedia  
✅ **Full-Screen Player** - Immersive video watching experience  
✅ **Speed Controls** - Watch at 0.25x to 2x speed  
✅ **Keyboard Shortcuts** - Full keyboard control  
✅ **No Login** - Completely open access  
✅ **Zero Integrations** - Pure code + video files  
✅ **Vercel Ready** - One-click deployment  
✅ **Mobile Friendly** - Responsive design  

## Quick Start

### 1. Clone or Download

```bash
git clone <your-repo-url>
cd video-wiki
```

### 2. Add Videos

Drop your MP4 files into the `public/videos/` directory:

```
video-wiki/
├── public/
│   └── videos/
│       ├── tutorial.mp4
│       ├── lecture.mp4
│       └── demo.mp4
├── app/
├── components/
└── package.json
```

### 3. Install & Run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Deployment to Vercel

### Option 1: One-Click Deploy (Easiest)

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Click "Deploy"

### Option 2: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `<` / `>` | Decrease/Increase Speed |
| `←` / `→` | Skip -5s / +5s |
| `f` | Fullscreen |
| `Esc` | Close Player |

## File Structure

```
video-wiki/
├── app/
│   ├── page.js              # Main page
│   ├── page.module.css      # Page styles
│   ├── layout.js            # Root layout
│   ├── globals.css          # Global styles
│   └── api/
│       └── videos/
│           └── route.js     # Video API
├── components/
│   ├── VideoGrid.js         # Video grid
│   ├── VideoGrid.module.css # Grid styles
│   ├── VideoPlayer.js       # Video player
│   └── VideoPlayer.module.css # Player styles
├── public/
│   └── videos/              # Drop MP4s here
├── package.json
├── next.config.js
└── README.md
```

## Video Format Support

- MP4 (recommended)
- WebM
- MOV
- MKV

## How It Works

1. **Video Discovery**: The app scans `public/videos/` for video files
2. **Grid Display**: Videos appear as cards in the wiki-style interface
3. **Full-Screen Player**: Click any video to open full-screen player
4. **Speed Control**: Adjust playback speed with dropdown or keyboard
5. **Navigation**: Use keyboard shortcuts or buttons to control playback

## Tech Stack

- **Next.js 14** - React framework
- **CSS Modules** - Scoped styling
- **Vercel** - Hosting

## No External Dependencies

This project has:
- ❌ No Firebase, Supabase, or databases
- ❌ No authentication services
- ❌ No CDN integrations
- ❌ No third-party APIs
- ✅ Pure Node.js file system API
- ✅ Pure HTML5 video player

## Customization

### Change Title & Branding

Edit `app/page.js`:
```javascript
<h1 className={styles.title}>📹 My Video Library</h1>
```

### Change Colors

Edit `components/VideoGrid.module.css` and `components/VideoPlayer.module.css`:
```css
.thumbnail {
  background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
}
```

### Add Custom CSS

All styles are in `.module.css` files. Modify globally in `app/globals.css`.

## Troubleshooting

### Videos not showing?
- Ensure files are in `public/videos/`
- File names must have correct extensions: `.mp4`, `.webm`, `.mov`, `.mkv`
- Refresh the page

### Video not playing?
- Check browser console for errors
- Ensure video format is supported
- Try different video file

### Keyboard shortcuts not working?
- Click the player area first to focus it
- Some browsers may have restrictions on fullscreen

## Performance

- Videos are streamed directly (not downloaded)
- No video transcoding or processing
- Minimal JavaScript
- Zero tracking or analytics

## License

Free to use. Modify as needed.

## Support

For issues, check:
1. Video file format (must be `.mp4`, `.webm`, `.mov`, or `.mkv`)
2. Video file location (`public/videos/`)
3. Browser compatibility (modern browsers only)
4. File names with special characters (should be URL-safe)

---

**Made with ❤️ for knowledge sharing**
