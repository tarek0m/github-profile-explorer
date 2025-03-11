'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import RepositoryList from './components/RepositoryList';

export default function Home() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [compareUser, setCompareUser] = useState(null);
  const [compareRepos, setCompareRepos] = useState([]);
  const [comparing, setComparing] = useState(false);
  const [compareUsername, setCompareUsername] = useState('');

  const fetchUserData = async (username) => {
    setLoading(true);
    setError(null);

    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!userResponse.ok) {
        throw new Error(`GitHub API error: ${userResponse.status}`);
      }

      const userData = await userResponse.json();
      setUser(userData);

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
      );

      if (!reposResponse.ok) {
        throw new Error(`GitHub API error: ${reposResponse.status}`);
      }

      const reposData = await reposResponse.json();
      setRepos(reposData);
    } catch (err) {
      setError(err.message);
      setUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompareUserData = async (username) => {
    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!userResponse.ok) {
        throw new Error(`GitHub API error: ${userResponse.status}`);
      }

      const userData = await userResponse.json();
      setCompareUser(userData);

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
      );

      if (!reposResponse.ok) {
        throw new Error(`GitHub API error: ${reposResponse.status}`);
      }

      const reposData = await reposResponse.json();
      setCompareRepos(reposData);
    } catch (err) {
      setError(err.message);
      setCompareUser(null);
      setCompareRepos([]);
    }
  };

  const handleSearch = (username) => {
    fetchUserData(username);
    if (comparing) {
      setComparing(false);
      setCompareUser(null);
      setCompareRepos([]);
      setCompareUsername('');
    }
  };

  const handleCompare = (e) => {
    e.preventDefault();
    if (compareUsername.trim() && user) {
      setComparing(true);
      fetchCompareUserData(compareUsername.trim());
    }
  };

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
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image
            src='/github.svg'
            alt='GitHub Logo'
            width={40}
            height={40}
            style={{ filter: 'invert(1)' }}
          />
          <h1>GitHub Profile Explorer</h1>
        </div>
      </header>

      <main className={styles.main}>
        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className={styles.loading}>
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}

        {user && (
          <div className={styles.content}>
            <UserProfile user={user} />

            {!comparing && (
              <div className={styles.compareContainer}>
                <h2>Compare with another user</h2>
                <form onSubmit={handleCompare} className={styles.compareForm}>
                  <input
                    type='text'
                    value={compareUsername}
                    onChange={(e) => setCompareUsername(e.target.value)}
                    placeholder='Enter GitHub username to compare'
                    className={styles.compareInput}
                  />
                  <button type='submit' className={styles.compareButton}>
                    Compare
                  </button>
                </form>
              </div>
            )}

            {comparing && compareUser && (
              <div className={styles.comparisonResults}>
                <h2>Comparison Results</h2>
                <div className={styles.comparisonHeader}>
                  <div className={styles.comparisonUser}>{user.login}</div>
                  <div className={styles.comparisonMetric}>Metric</div>
                  <div className={styles.comparisonUser}>
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
                  onClick={() => {
                    setComparing(false);
                    setCompareUser(null);
                    setCompareRepos([]);
                    setCompareUsername('');
                  }}
                  className={styles.closeComparisonButton}
                >
                  Close Comparison
                </button>
              </div>
            )}

            <RepositoryList repositories={repos} />
          </div>
        )}
      </main>
    </div>
  );
}
