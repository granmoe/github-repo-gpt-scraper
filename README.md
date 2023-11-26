# GitHub Repo GPT Scraper

Welcome to the GitHub Repo GPT Scraper! This powerful tool is designed to help you effortlessly scrape GitHub repositories in order to create an [OpenAI GPT](https://chat.openai.com/create) based on your code! It works with either a public GitHub repository URL or a local directory (defaulting to the `cwd` if no URL is passed).

## Getting Started

### Prerequisites

- Node.js and npm or pnpm installed.

### Installation

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/your-username/github-repo-gpt-scraper.git
   ```

2. **Navigate to the Project Directory**:

   ```sh
   cd github-repo-gpt-scraper
   ```

3. **Install Dependencies**:

   ```sh
   npm install
   ```

   Or, if you're using pnpm:

   ```sh
   pnpm install
   ```

4. **Build the Project**:
   ```sh
   npm run build
   ```

### Usage

- **Scrape a GitHub Repository**:

  ```sh
  github-repo-gpt-scraper https://github.com/user/repo --out=repo.json
  ```

  Replace `https://github.com/user/repo` with the URL of the repository you wish to scrape.

- **Scrape the Current Working Directory**:
  ```sh
  github-repo-gpt-scraper --out=repo.json
  ```
  This will scrape all the files in your current directory.

### Output

The tool outputs a JSON file (`repo.json` in the above examples) containing the path, URL, and content of each file scraped. I haven't yet experimented with different ways of formatting the file data (or adding supplemental info) and their impact on GPTs, but I'd be eager to hear about anyone's findings if they do so!

## Contribute

Contributions are welcome! Open a PR 😎

## License

This project is licensed under the MIT License.

---

Happy Scraping and GPTs'ing! 🚀🤖

---

## Basic Example GPT Instructions

You are the creator of the codebase documented in the attached file and an expert in all of its code and the dependencies it uses. All of the user's question will relate to this code, so reference it heavily. Give factual, detailed answers and help the user make updates to the code in as efficient a manner possible while explaining more complex points to them along the way.
