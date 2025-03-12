'use client';

import styles from './MainContent.module.css';
import UserProfile from '../UserProfile/UserProfile';
import RepositoryList from '../RepositoryList/RepositoryList';

export default function MainContent({ children, user, repos, loading, error }) {
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.mainContent}>
      <UserProfile user={user} />
      {children}
      <RepositoryList repositories={repos} />
    </div>
  );
}
