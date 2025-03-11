'use client';

import { useState } from 'react';
import styles from './RepositoryList.module.css';

export default function RepositoryList({ repositories }) {
  const [sortBy, setSortBy] = useState('updated');
  
  if (!repositories || repositories.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No repositories found</p>
      </div>
    );
  }

  const sortedRepos = [...repositories].sort((a, b) => {
    if (sortBy === 'stars') {
      return b.stargazers_count - a.stargazers_count;
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else { // 'updated' is default
      return new Date(b.updated_at) - new Date(a.updated_at);
    }
  });

  return (
    <div className={styles.repoListContainer}>
      <div className={styles.repoListHeader}>
        <h2 className={styles.repoListTitle}>Repositories</h2>
        <div className={styles.sortOptions}>
          <span>Sort by:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="updated">Recently Updated</option>
            <option value="stars">Stars</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      
      <div className={styles.repoList}>
        {sortedRepos.map((repo) => (
          <div key={repo.id} className={styles.repoCard}>
            <div className={styles.repoHeader}>
              <h3 className={styles.repoName}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
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
                  <span className={styles.statIcon}>🍴</span>
                  <span>{repo.forks_count}</span>
                </div>
              </div>
            </div>
            
            {repo.description && (
              <p className={styles.repoDescription}>{repo.description}</p>
            )}
            
            <div className={styles.repoFooter}>
              <span className={styles.repoUpdated}>
                Updated on {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}