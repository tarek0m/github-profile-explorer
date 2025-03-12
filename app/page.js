'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import MainContent from './components/MainContent/MainContent';
import CompareSection from './components/CompareSection/CompareSection';
import { fetchGithubUserData } from './utils/github';

export default function Home() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [compareError, setCompareError] = useState(null);
  const [compareUser, setCompareUser] = useState(null);
  const [compareRepos, setCompareRepos] = useState([]);
  const [comparing, setComparing] = useState(false);
  const [compareUsername, setCompareUsername] = useState('');

  const handleSearch = (username) => {
    fetchGithubUserData(username, { setUser, setRepos, setLoading, setError });
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
      fetchGithubUserData(compareUsername.trim(), {
        setUser: setCompareUser,
        setRepos: setCompareRepos,
        setError: setCompareError,
      });
    }
  };

  const handleCloseComparison = () => {
    setComparing(false);
    setCompareUser(null);
    setCompareRepos([]);
    setCompareUsername('');
  };

  return (
    <div className='page'>
      <Header />
      <main className={styles.main}>
        <SearchBar onSearch={handleSearch} />
        <MainContent user={user} repos={repos} loading={loading} error={error}>
          {user && (
            <CompareSection
              comparing={comparing}
              error={compareError}
              compareUsername={compareUsername}
              setCompareUsername={setCompareUsername}
              repos={repos}
              user={user}
              compareUser={compareUser}
              compareRepos={compareRepos}
              onCompare={handleCompare}
              onCloseComparison={handleCloseComparison}
            />
          )}
        </MainContent>
      </main>
    </div>
  );
}
