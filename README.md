# GitHub Repo GPT Scraper

Welcome to the GitHub Repo GPT Scraper! This powerful tool is designed to help you effortlessly scrape GitHub repositories in order to create an [OpenAI GPT](https://chat.openai.com/create) based on your code! It works with either a public GitHub repository URL or a local directory (defaulting to the `cwd` if no URL is passed).

## Getting Started

### Prerequisites

- Node.js installed.

### Usage

- **Scrape a GitHub Repository**:

  ```sh
  npx github-repo-gpt-scraper --url=https://github.com/user/repo --out=repo.json
  ```

  Replace `https://github.com/user/repo` with the URL of the repository you wish to scrape.

- **Scrape the Current Working Directory**:

  ```sh
  npx github-repo-gpt-scraper --out=repo.json
  ```

  This will scrape all the files in your current directory.

- **Create a GPT Using the Scraped Data**:

1. Visit [https://chat.openai.com/create](https://chat.openai.com/create) and click the "Configure" tab.
2. Under "Knowledge," click "Upload files" and select the JSON file output by the scraper.
3. Add the following basic instructions to the "Instructions" field:

   ```md
   You are the creator of the codebase documented in the attached file and an expert in all of its code and the dependencies it uses. All of the user's question will relate to this code, so reference it heavily. Give factual, detailed answers and help the user make updates to the code in as efficient a manner possible while explaining more complex points to them along the way.
   ```

The simple instructions above cover the essentials and seem to work pretty well, but feel free to experiment with your own!

### Output

The tool outputs a JSON file (`repo.json` in the above examples) containing the path, URL, and content of each file scraped. I haven't yet experimented with different ways of formatting the file data (or adding supplemental info) and their impact on GPTs, but I'd be eager to hear about anyone's findings if they do so!

## Contribute

Contributions are welcome! Open a PR 😎

## License

This project is licensed under the MIT License.

---

Happy Scraping and GPTs'ing! 🚀🤖
