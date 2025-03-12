export const fetchGithubUserData = async (
  username,
  { setUser, setRepos, setLoading, setError }
) => {
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
    let errorMessage = err.message;

    if (err.message.includes('404')) {
      errorMessage =
        'Username not found. Please check the spelling and try again.';
    } else if (err.message.includes('403')) {
      errorMessage = 'API rate limit exceeded. Please try again later.';
    }

    if (setError) setError(errorMessage);
    if (setUser) setUser(null);
    if (setRepos) setRepos([]);
  } finally {
    if (setLoading) setLoading(false);
  }
};
