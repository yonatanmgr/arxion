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

## API Routes

### Overview

arXion provides several API routes to interact with the arXiv data. The routes are designed to fetch papers, search for keywords, and get detailed information about specific papers.

### Available Routes

- **GET /api/papers**: Fetch a list of recent papers.
- **GET /api/search**: Search for papers using keywords.
- **GET /api/paper/{id}**: Get detailed information about a specific paper by its ID.

### Using the API

1. **Fetch Recent Papers**:

    ```bash
    curl http://localhost:3000/api/papers
    ```

2. **Search for Papers**:

    ```bash
    curl http://localhost:3000/api/search?query=quantum
    ```

3. **Get Paper Details**:

    ```bash
    curl http://localhost:3000/api/paper/{id}
    ```

Replace `{id}` with the specific paper ID you want to retrieve.

## arXion is using...

- **next**: The React framework used for building the application.
- **axios**: For making HTTP requests to the arXiv API.
- **better-react-mathjax**: For rendering mathematical equations.
- **tailwindcss**: For styling the application.
- **zustand**: For state management.
- **framer-motion**: For animations and transitions.
- **moment**: For date and time manipulation.
- **swr**: For data fetching and caching.
- **xml2js**: For parsing XML data from the arXiv API.
