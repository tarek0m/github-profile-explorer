# GitHub Profile Explorer

A powerful web application that allows you to explore and compare GitHub user profiles, built with Next.js.

## Features

- 🔍 Search for any GitHub user profile.
- 📊 View detailed user statistics and repositories.
- 🔄 Compare two GitHub profiles side by side.
- 📈 Analyze repository statistics (stars, forks).
- 🎨 Clean and modern UI with Geist font.
- 📱 Responsive design for all devices.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/tarek0m/github-profile-explorer.git
cd github-profile-explorer
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Enter a GitHub username in the search bar
2. View the user's profile information, including:
   - Profile picture and bio
   - Follower and following counts
   - Public repositories and gists
   - Repository statistics
3. To compare profiles:
   - Search for the first user
   - Enter another username in the comparison field
   - View side-by-side statistics and metrics

## Project Structure

```
app/
  components/         # React components
  page.js            # Main application page
  layout.js          # Root layout component
public/              # Static assets
```

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [GitHub API](https://docs.github.com/en/rest) - Data source
- [Geist Font](https://vercel.com/font) - Typography

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
