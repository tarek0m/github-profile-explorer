'use client';

import styles from './CompareSection.module.css';
import Image from 'next/image';

export default function CompareSection({
  comparing,
  error,
  compareUsername,
  setCompareUsername,
  user,
  repos,
  compareUser,
  compareRepos,
  onCompare,
  onCloseComparison,
}) {
  const calculateComparison = () => {
    if (!user || !compareUser) return null;

    return {
      followers: {
        user1: user.followers,
        user2: compareUser.followers,
        difference: user.followers - compareUser.followers,
        percentage: compareUser.followers
          ? Math.round((user.followers / compareUser.followers) * 100)
          : 0,
      },
      repos: {
        user1: user.public_repos,
        user2: compareUser.public_repos,
        difference: user.public_repos - compareUser.public_repos,
        percentage: compareUser.public_repos
          ? Math.round((user.public_repos / compareUser.public_repos) * 100)
          : 0,
      },
      gists: {
        user1: user.public_gists,
        user2: compareUser.public_gists,
        difference: user.public_gists - compareUser.public_gists,
        percentage: compareUser.public_gists
          ? Math.round((user.public_gists / compareUser.public_gists) * 100)
          : 0,
      },
      following: {
        user1: user.following,
        user2: compareUser.following,
        difference: user.following - compareUser.following,
        percentage: compareUser.following
          ? Math.round((user.following / compareUser.following) * 100)
          : 0,
      },
      avgStars: {
        user1: repos.length
          ? Math.round(
              repos.reduce((acc, repo) => acc + repo.stargazers_count, 0) /
                repos.length
            )
          : 0,
        user2: compareRepos.length
          ? Math.round(
              compareRepos.reduce(
                (acc, repo) => acc + repo.stargazers_count,
                0
              ) / compareRepos.length
            )
          : 0,
      },
      avgForks: {
        user1: repos.length
          ? Math.round(
              repos.reduce((acc, repo) => acc + repo.forks_count, 0) /
                repos.length
            )
          : 0,
        user2: compareRepos.length
          ? Math.round(
              compareRepos.reduce((acc, repo) => acc + repo.forks_count, 0) /
                compareRepos.length
            )
          : 0,
      },
    };
  };

  const comparison = comparing && compareUser ? calculateComparison() : null;

  return (
    <div className={styles.compareContainer}>
      <div className={styles.compareForm}>
        <input
          type='text'
          value={compareUsername}
          onChange={(e) => setCompareUsername(e.target.value)}
          placeholder='Enter username to compare'
          className={styles.compareInput}
        />
        <button onClick={onCompare} className={styles.compareButton}>
          Compare
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}
      {comparing && compareUser && (
        <div className={styles.comparisonResults}>
          <h2>Comparison Results</h2>
          <div className={styles.comparisonHeader}>
            <div className={styles.comparisonUser}>
                <Image
                  src={user.avatar_url}
                  alt={`${user.login}'s avatar`}
                  width={75}
                  height={75}
                  className={styles.avatar}
                />
                {user.login}
            </div>
            <div className={styles.comparisonMetric}>Metric</div>
            <div className={styles.comparisonUser}>
                <Image
                  src={compareUser.avatar_url}
                  alt={`${compareUser.login}'s avatar`}
                  width={75}
                  height={75}
                  className={styles.avatar}
                />
                {compareUser.login}
            </div>
          </div>

          <div className={styles.comparisonTable}>
            <div className={styles.comparisonRow}>
              <div className={styles.comparisonValue}>
                {comparison.followers.user1}
              </div>
              <div className={styles.comparisonLabel}>Followers</div>
              <div className={styles.comparisonValue}>
                {comparison.followers.user2}
              </div>
            </div>

            <div className={styles.comparisonRow}>
              <div className={styles.comparisonValue}>
                {comparison.repos.user1}
              </div>
              <div className={styles.comparisonLabel}>Repositories</div>
              <div className={styles.comparisonValue}>
                {comparison.repos.user2}
              </div>
            </div>

            <div className={styles.comparisonRow}>
              <div className={styles.comparisonValue}>
                {comparison.following.user1}
              </div>
              <div className={styles.comparisonLabel}>Following</div>
              <div className={styles.comparisonValue}>
                {comparison.following.user2}
              </div>
            </div>

            <div className={styles.comparisonRow}>
              <div className={styles.comparisonValue}>
                {comparison.avgStars.user1}
              </div>
              <div className={styles.comparisonLabel}>Avg. Stars</div>
              <div className={styles.comparisonValue}>
                {comparison.avgStars.user2}
              </div>
            </div>

            <div className={styles.comparisonRow}>
              <div className={styles.comparisonValue}>
                {comparison.avgForks.user1}
              </div>
              <div className={styles.comparisonLabel}>Avg. Forks</div>
              <div className={styles.comparisonValue}>
                {comparison.avgForks.user2}
              </div>
            </div>
          </div>

          <button
            onClick={onCloseComparison}
            className={styles.closeComparisonButton}
          >
            Close Comparison
          </button>
        </div>
      )}
    </div>
  );
}
