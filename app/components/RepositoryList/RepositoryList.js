'use client';

import { useState } from 'react';
import styles from './RepositoryList.module.css';
import RepositoryCard from '../RepositoryCard/RepositoryCard';

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
    } else {
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
            <option value='updated'>Recently Updated</option>
            <option value='stars'>Stars</option>
            <option value='name'>Name</option>
          </select>
        </div>
      </div>

      <div className={styles.repoList}>
        {sortedRepos.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}
