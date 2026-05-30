'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import VideoGrid from '@/components/VideoGrid';
import VideoPlayer from '@/components/VideoPlayer';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      const data = await response.json();
      setVideos(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>📹 Video Wiki</h1>
          <p className={styles.subtitle}>Free, open video library with speed controls</p>
        </div>
      </header>

      {selectedVideo ? (
        <VideoPlayer 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)}
          onNext={() => {
            const currentIndex = videos.findIndex(v => v.id === selectedVideo.id);
            if (currentIndex < videos.length - 1) {
              setSelectedVideo(videos[currentIndex + 1]);
            }
          }}
          onPrev={() => {
            const currentIndex = videos.findIndex(v => v.id === selectedVideo.id);
            if (currentIndex > 0) {
              setSelectedVideo(videos[currentIndex - 1]);
            }
          }}
          hasNext={videos.length > 1 && videos[videos.findIndex(v => v.id === selectedVideo.id)]?.id !== videos[videos.length - 1]?.id}
          hasPrev={videos.length > 1 && videos[videos.findIndex(v => v.id === selectedVideo.id)]?.id !== videos[0]?.id}
        />
      ) : (
        <main className={styles.main}>
          <div className={styles.content}>
            {loading ? (
              <p className={styles.loading}>Loading videos...</p>
            ) : videos.length === 0 ? (
              <div className={styles.empty}>
                <p>No videos found</p>
                <small>Add MP4 files to <code>public/videos/</code> directory</small>
              </div>
            ) : (
              <>
                <div className={styles.stats}>
                  <p>{videos.length} video{videos.length !== 1 ? 's' : ''} available</p>
                </div>
                <VideoGrid 
                  videos={videos} 
                  onSelect={setSelectedVideo}
                />
              </>
            )}
          </div>
        </main>
      )}

      <footer className={styles.footer}>
        <p>Video Wiki • No login • No tracking • Pure video knowledge</p>
      </footer>
    </div>
  );
}
