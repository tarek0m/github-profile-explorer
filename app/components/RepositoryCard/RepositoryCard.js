'use client';

import styles from './RepositoryCard.module.css';

export default function RepositoryCard({ repo }) {
  return (
    <div key={repo.id} className={styles.repoCard}>
      <div className={styles.repoHeader}>
        <h3 className={styles.repoName}>
          <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
            {repo.name}
          </a>
        </h3>
        <div className={styles.repoStats}>
          <div className={styles.repoStat}>
            <span className={styles.statIcon}>⭐</span>
            <span>{repo.stargazers_count}</span>
          </div>
          {repo.language && (
            <div className={styles.repoStat}>
              <span className={styles.statIcon}>🔵</span>
              <span>{repo.language}</span>
            </div>
          )}
          <div className={styles.repoStat}>
            <span className={styles.statIcon}>🔀</span>
            <span>{repo.forks_count}</span>
          </div>
        </div>
      </div>

      {repo.description && (
        <p className={styles.repoDescription}>{repo.description}</p>
      )}

      <div className={styles.repoFooter}>
        <span className={styles.repoUpdated}>
          Updated on{' '}
          {new Date(repo.updated_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
}
