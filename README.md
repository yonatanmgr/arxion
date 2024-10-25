# arXion

A simple arXiv explorer.

## Description

arXion is a web application designed to explore and search for research papers on arXiv. Built with TypeScript, it provides a user-friendly interface to navigate through arXiv's vast collection of academic papers.

## Features

- **Search Functionality**: Users can search for papers using keywords.
- **MathJax Support**: Proper rendering of mathematical equations present in the papers.
- **Dark Mode**: Toggle between light and dark themes for better readability.

## Getting Started

### Prerequisites

Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yonatanmgr/arxion.git
    cd arxion
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Routes

- **Home Page**: Displays the search bar and recent papers.
- **Search Results**: Shows the list of papers based on the search query.
- **Paper Details**: Provides detailed information about a specific paper, including the abstract and download links.

## Learn More

To learn more about arXion, check out the source code and feel free to contribute by submitting issues or pull requests.
