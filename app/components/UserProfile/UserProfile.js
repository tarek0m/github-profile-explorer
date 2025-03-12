'use client';

import styles from './UserProfile.module.css';
import Image from 'next/image';

export default function UserProfile({ user }) {
  if (!user) return null;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarContainer}>
          <Image
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            width={120}
            height={120}
            className={styles.avatar}
          />
        </div>
        <div className={styles.userInfo}>
          <h1 className={styles.name}>{user.name || user.login}</h1>
          {user.login && <p className={styles.username}>@{user.login}</p>}
          {user.bio && <p className={styles.bio}>{user.bio}</p>}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{user.followers}</span>
              <span className={styles.statLabel}>Followers</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{user.following}</span>
              <span className={styles.statLabel}>Following</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{user.public_repos}</span>
              <span className={styles.statLabel}>Repositories</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.profileDetails}>
        {user.company && (
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>🏢</span>
            <span>{user.company}</span>
          </div>
        )}
        {user.location && (
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>📍</span>
            <span>{user.location}</span>
          </div>
        )}
        {user.blog && (
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>🔗</span>
            <a
              href={
                user.blog.startsWith('http')
                  ? user.blog
                  : `https://${user.blog}`
              }
              target='_blank'
              rel='noopener noreferrer'
            >
              {user.blog}
            </a>
          </div>
        )}
        {user.twitter_username && (
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>🐦</span>
            <a
              href={`https://twitter.com/${user.twitter_username}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              @{user.twitter_username}
            </a>
          </div>
        )}
        {user.created_at && (
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>📅</span>
            <span>
              Joined{' '}
              {new Date(user.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
