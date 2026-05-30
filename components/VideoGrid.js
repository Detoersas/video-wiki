import styles from './VideoGrid.module.css';

export default function VideoGrid({ videos, onSelect }) {
  return (
    <div className={styles.grid}>
      {videos.map((video) => (
        <div
          key={video.id}
          className={styles.card}
          onClick={() => onSelect(video)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onSelect(video);
            }
          }}
        >
          <div className={styles.thumbnail}>
            <span className={styles.playIcon}>▶</span>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.title}>{video.name}</h3>
            <p className={styles.duration}>{video.duration}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
