---
title: "Deploying Your MarkVault Site to GitHub Pages: A Step-by-Step Guide"
date: 2024-11-19
author: Phil T
excerpt: "Learn how to deploy your MarkVault site to GitHub Pages using GitHub Actions. This guide covers the complete setup process, from configuring Next.js for static export to automating deployments."
image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1920&auto=format&fit=crop"
tags: [deployment, github-pages, nextjs, automation]
---

# Deploying Your MarkVault Site to GitHub Pages

> "The best way to predict deployment success is to automate it."

## Prerequisites

Before we begin, ensure you have:
- A MarkVault site set up and running locally
- A GitHub account
- Git installed on your machine
- Basic familiarity with the command line

## Setting Up Your Repository

1. **Initialize Git Repository**
   - Your content and site code should be in the same repository
   - The Next.js application lives in the `site` directory
   - Content is stored in the `content` directory

2. **Configure Next.js**
   Add or update your `site/next.config.js`:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
     basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
   }
   ```

## GitHub Actions Workflow

Create `.github/workflows/static.yml`:
```yaml
name: Deploy Next.js site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      # ... workflow steps ...
```

## GitHub Pages Configuration

1. Navigate to repository settings
2. Select "Pages" from the sidebar
3. Configure build source as "GitHub Actions"

## Deployment Process

The automated process will:
1. Build your Next.js application
2. Generate static files
3. Deploy to GitHub Pages
4. Make your site available at `username.github.io/repo-name`

## Verifying Your Deployment

After pushing changes:
1. Check the Actions tab for build status
2. Wait for the workflow to complete
3. Visit your deployed site
4. Verify content and navigation

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Missing content | Check content directory paths |
| 404 errors | Verify basePath in next.config.js |
| Build failures | Check dependencies and Node version |
| Image loading | Ensure unoptimized images config |

## Best Practices

- Always test locally before pushing
- Use meaningful commit messages
- Monitor GitHub Actions logs
- Keep dependencies updated

## Next Steps

1. Set up a custom domain (optional)
2. Configure SSL certificates
3. Implement continuous integration
4. Add deployment status badges

> "Automation is not about replacing humans; it's about enhancing our capabilities."

## Further Resources

1. [GitHub Pages Documentation](https://docs.github.com/pages)
2. [Next.js Static Exports](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
3. [GitHub Actions Guide](https://docs.github.com/actions)

---

*Last updated: Nov 19, 2024*
