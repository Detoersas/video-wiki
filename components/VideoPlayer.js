'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './VideoPlayer.module.css';

export default function VideoPlayer({ video, onClose, onNext, onPrev, hasNext, hasPrev }) {
  const videoRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = speed;
    }
  }, [speed]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case ' ':
        e.preventDefault();
        togglePlay();
        break;
      case 'f':
        toggleFullscreen();
        break;
      case 'ArrowLeft':
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
        }
        break;
      case 'ArrowRight':
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5);
        }
        break;
      case '>':
        if (speed < 2) setSpeed(speed + 0.25);
        break;
      case '<':
        if (speed > 0.25) setSpeed(speed - 0.25);
        break;
      case 'Escape':
        onClose();
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.playerContainer} onMouseMove={handleMouseMove} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          src={video.url}
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className={styles.video}
        />

        <div className={`${styles.controls} ${showControls ? styles.visible : ''}`}>
          <div className={styles.progressBar}>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className={styles.progress}
            />
          </div>

          <div className={styles.controlsBottom}>
            <div className={styles.leftControls}>
              <button
                className={styles.btn}
                onClick={togglePlay}
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              <div className={styles.speedControl}>
                <select
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className={styles.speedSelect}
                  title="Speed (< and >)"
                >
                  <option value={0.25}>0.25x</option>
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={1.75}>1.75x</option>
                  <option value={2}>2x</option>
                </select>
              </div>

              <span className={styles.time}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className={styles.rightControls}>
              {hasPrev && (
                <button
                  className={styles.btn}
                  onClick={onPrev}
                  title="Previous video"
                >
                  ⏮
                </button>
              )}

              {hasNext && (
                <button
                  className={styles.btn}
                  onClick={onNext}
                  title="Next video"
                >
                  ⏭
                </button>
              )}

              <button
                className={styles.btn}
                onClick={toggleFullscreen}
                title="Fullscreen (f)"
              >
                ⛶
              </button>

              <button
                className={styles.btn}
                onClick={onClose}
                title="Close (Esc)"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <h2>{video.name}</h2>
        <div className={styles.keyboardHints}>
          <p>Keyboard: <kbd>Space</kbd> Play/Pause • <kbd>&lt;</kbd><kbd>&gt;</kbd> Speed • <kbd>←</kbd><kbd>→</kbd> Skip • <kbd>f</kbd> Fullscreen • <kbd>Esc</kbd> Close</p>
        </div>
      </div>
    </div>
  );
}
