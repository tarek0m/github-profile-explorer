export const fetchGithubUserData = async (username, { setUser, setRepos, setLoading, setError }) => {
  if (setLoading) setLoading(true);
  if (setError) setError(null);

  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );

    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    if (setUser) setUser(userData);

    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status}`);
    }

    const reposData = await reposResponse.json();
    if (setRepos) setRepos(reposData);
  } catch (err) {
    if (setError) setError(err.message);
    if (setUser) setUser(null);
    if (setRepos) setRepos([]);
  } finally {
    if (setLoading) setLoading(false);
  }
};