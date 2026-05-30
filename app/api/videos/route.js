import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const videosDir = path.join(process.cwd(), 'public/videos');
    
    if (!fs.existsSync(videosDir)) {
      fs.mkdirSync(videosDir, { recursive: true });
    }

    const files = fs.readdirSync(videosDir);
    const videoFiles = files.filter(file => 
      /\.(mp4|webm|mov|mkv)$/i.test(file)
    );

    const videos = videoFiles.map((file, index) => {
      const name = file.replace(/\.[^/.]+$/, '');
      return {
        id: index,
        name: decodeURIComponent(name),
        filename: file,
        url: `/videos/${encodeURIComponent(file)}`,
        duration: 'Play to view',
      };
    });

    return Response.json(videos);
  } catch (error) {
    console.error('Error reading videos:', error);
    return Response.json([], { status: 200 });
  }
}
