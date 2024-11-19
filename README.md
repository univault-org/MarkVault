# MarkVault Starter

A lightweight starter template for building knowledge bases, websites, and blogs with pure React and Markdown. See it in action: [Live Demo](https://univault-org.github.io/MarkVault/)

## Why MarkVault?

- 🎯 **Purpose-Built**: Designed specifically for modern SEO optimized websites, knowledge bases and technical blogs
- 🛠 **Developer-Friendly**: Uses familiar tools - React, Next.js, Markdown, and simple HTML/JS
- 🔒 **Future-Proof**: Simple tech stack ensures long-term maintainability

## Key Features

### 📝 Decentralized Content Preservation
- Content lives in contributors' local machines
- Each contributor maintains their own copy
- Site content survives even if the main site goes down
- True to the original vision of distributed web

### 🤝 Content Contribution Made Simple
1. Clone the repository:
```bash
git clone https://github.com/univault-org/MarkVault.git
```

2. Add or edit markdown files in the `content` folder:
```
content/
├── posts/          # Blog posts go here
│   └── WHY.md
├── pages/          # Static pages
│   └── about.md
└── images/         # Images for your content
    └── banner.jpg
```

3. Preview your content instantly using any of these methods:
```bash
# Using Python (Python 3 required)
python -m http.server

# OR using Node.js
npx http-server

# OR using PHP
php -S localhost:8000

# Then open http://localhost:8000 in your browser
```

4. Or simply use VS Code:
- Install "Live Server" extension
- Right-click `index.html`
- Select "Open with Live Server"

No need to:
- Set up Node.js or Next.js
- Install dependencies
- Run complex build commands
- Configure development environment

Just write markdown, preview instantly, and submit your changes!

### 🌐 Dual Development Paths
- **Content Contributors**: Use simple HTML preview
- **Site Developers**: Full Next.js development environment
- **Best of Both**: Choose the workflow that suits you

## Quick Start

1. Use this template:
```bash
# Clone the repository
git clone https://github.com/univault-org/MarkVault.git my-site

# Navigate to my-site
cd my-site

# Navigate to the Next.js app directory
cd site

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The project structure will look like this:
```
my-site/              # Root directory
├── content/          # Your content lives here
│   ├── posts/        # Blog posts in markdown
│   └── pages/        # Static pages in markdown
│
└── site/            # Next.js application
    ├── app/         # Next.js app directory
    ├── components/  # React components
    └── package.json # Dependencies and scripts
```

Note: All development commands (pnpm install, pnpm dev) must be run from the `site` directory, while content is managed in the `content` directory at the root level.

### React Setup (Simple Development)

```bash
# Clone the react branch
git clone -b markvault-react https://github.com/univault-org/MarkVault.git my-site
cd my-site

# No installation needed!
npx serve site
```

2. Create a new repository on GitHub

3. Update your remote:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

4. Deploy to GitHub Pages:
```bash
# Create and switch to deploy branch
git checkout -b deploy/gh-pages

# Push to GitHub
git push -u origin deploy/gh-pages
```

5. Enable GitHub Pages:
- Go to your repository settings
- Navigate to "Pages"
- Under "Build and deployment":
  - Source: Deploy from a branch
  - Branch: deploy/gh-pages
  - Folder: / (docs)
- Click Save

Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`


## Content Management

### Creating Posts

Add markdown files to `site/content/posts/` with frontmatter:

```markdown
---
title: My First Post
date: 2024-01-20
author: Your Name
excerpt: A brief description
---

Your markdown content here...
```

### Creating Pages

Add markdown files to `site/content/pages/` with frontmatter:

```markdown
---
title: About
lastUpdated: 2024-01-20
---

Your page content here...
```

## Deployment Updates

After making changes:
```bash
# Switch to deploy branch
git checkout deploy/gh-pages

# Add and commit changes
git add .
git commit -m "update: your changes description"

# Push to GitHub
git push origin deploy/gh-pages
```

Your changes will be live in a few minutes at your GitHub Pages URL.

## Customization

- **Themes**: Modify Tailwind configuration in `index.html`
- **Components**: Edit React components in `index.html`
- **Content**: Add markdown files to `site/content/` directory

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

### Core Technologies
- Built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/)
- Alternative setup available with pure [React](https://reactjs.org/)

### Styling & UI
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Bootstrap Icons](https://icons.getbootstrap.com/)

### Content Processing
- Markdown parsing by [Remark](https://github.com/remarkjs/remark)
- GFM support via [remark-gfm](https://github.com/remarkjs/remark-gfm)
- Frontmatter parsing with [gray-matter](https://github.com/jonschlinkert/gray-matter)

### Development Tools
- Package management with [pnpm](https://pnpm.io/)
- Date formatting with [date-fns](https://date-fns.org/)

---

Made with ❤️ by Univault Technologies
```

