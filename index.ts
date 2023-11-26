import axios from 'axios'
import yargs from 'yargs'
import fs from 'fs'
import path from 'path'

async function fetchRepoContents(
  owner: string,
  repo: string,
  path = '',
  page = 1,
): Promise<FileInfo[]> {
  const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?page=${page}`
  const response = await axios.get(baseUrl)
  const data = response.data

  if (!Array.isArray(data)) {
    throw new Error('Invalid response from GitHub API')
  }

  let files: FileInfo[] = []
  for (const item of data) {
    if (
      item.type === 'file' &&
      !isBinaryFile(item.name) &&
      !isLockfile(item.name)
    ) {
      try {
        const fileContentResponse = await axios.get(item.download_url)
        const fileContent = fileContentResponse.data

        // Convert content to string if it is JSON
        const fileContentAsString =
          typeof fileContent === 'object'
            ? JSON.stringify(fileContent, null, 2)
            : fileContent

        files.push({
          path: item.path,
          url: item.html_url,
          content: fileContentAsString,
        })
      } catch (error) {
        // TODO: Work around content fetch errors (rate-limiting, file too large, etc)
        console.error('Could not fetch file content', error)
      }
    } else if (item.type === 'dir') {
      const subdirectoryFiles = await fetchRepoContents(owner, repo, item.path)
      files = files.concat(subdirectoryFiles)
    }
  }

  // Check for pagination
  if (data.length === 30) {
    // GitHub API returns up to 30 items per page
    const nextPageFiles = await fetchRepoContents(owner, repo, path, page + 1)
    files = files.concat(nextPageFiles)
  }

  return files
}

function isBinaryFile(fileName: string): boolean {
  const binaryExtensions = [
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.bmp',
    '.pdf',
    '.zip',
    '.exe',
    '.dll',
  ]

  return binaryExtensions.some((extension) => fileName.endsWith(extension))
}

function isLockfile(fileName: string): boolean {
  const lockfileNames = [
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    'Gemfile.lock',
  ]

  return lockfileNames.includes(fileName)
}

async function scrapeGitHubRepo(url: string): Promise<FileInfo[]> {
  const regex = /github\.com\/(?<owner>[^\/]+)\/(?<repo>[^\/]+)/
  const match = url.match(regex)

  if (!match?.groups) {
    throw new Error('Invalid GitHub URL')
  }

  const { owner, repo } = match.groups

  return fetchRepoContents(owner, repo)
}

yargs(process.argv.slice(2))
  .scriptName('github-repo-gpt-scraper')
  .usage('$0 <repo_url> --out <output_file>')
  .command(
    '$0 <repo_url>',
    false,
    (yargs) => {
      return yargs
        .positional('repo_url', {
          describe: 'URL of the GitHub repository to scrape',
          type: 'string',
          demandOption: true,
        })
        .option('out', {
          alias: 'o',
          describe: 'Output file name (will write to command directory)',
          type: 'string',
          demandOption: true,
        })
    },
    async (argv) => {
      const repoUrl = argv.repo_url
      const outputPath = argv.out

      const files = await scrapeGitHubRepo(repoUrl)

      // Write files to disk at the specified output path
      const outputFilePath = path.join(process.cwd(), outputPath)
      fs.writeFileSync(outputFilePath, JSON.stringify(files, null, 2), 'utf8')

      console.log(`Data written to ${outputFilePath}`)
    },
  )
  .help().argv

type FileInfo = {
  path: string
  url: string
  content: string | null
}
