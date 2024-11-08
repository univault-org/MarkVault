const fs = require('fs').promises;
const path = require('path');

async function build() {
  try {
    console.log('🏗️ Starting build process...');

    // Clean docs directory if it exists
    console.log('🧹 Cleaning docs directory...');
    await fs.rm('docs', { recursive: true, force: true });
    await fs.mkdir('docs', { recursive: true });
    
    // Read content directories
    console.log('📚 Reading content...');
    const posts = await fs.readdir('site/content/posts');
    const pages = await fs.readdir('site/content/pages');
    
    // Read source HTML
    const sourceHTML = await fs.readFile('site/index.html', 'utf-8');
    
    // Generate routes
    const routes = [
      '/',
      '/posts',
      '/about',
      ...posts.map(post => `/posts/${post.replace('.md', '')}`),
    ];

    console.log('🔨 Generating HTML for routes:', routes);
    // Generate HTML for each route
    for (const route of routes) {
      const html = await generateHTML(sourceHTML, route);
      const fileName = route === '/' ? 'index.html' : `${route}/index.html`;
      
      await fs.mkdir(path.join('docs', path.dirname(fileName)), { recursive: true });
      await fs.writeFile(path.join('docs', fileName), html);
    }

    // Copy assets and content
    console.log('📂 Copying assets and content...');
    await copyAssets();

    // Create .nojekyll file
    await fs.writeFile('docs/.nojekyll', '');

    console.log('✅ Build completed successfully!');
    console.log('📦 Output directory: ./docs');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

async function generateHTML(sourceHTML, route) {
  // Add GitHub Pages configuration
  return sourceHTML.replace(
    '</head>',
    `
    <script>
      window.BASE_URL = 'https://raw.githubusercontent.com/univault-org/MarkVault/deploy/gh-pages';
      window.initialRoute = '${route}';
    </script>
    </head>
    `
  );
}

async function copyAssets() {
  try {
    // Create necessary directories
    await fs.mkdir('docs/content', { recursive: true });
    await fs.mkdir('docs/assets', { recursive: true });

    // Copy content directory
    await fs.cp('site/content', 'docs/content', { recursive: true });
    
    // Copy assets if they exist
    if (await fs.access('site/assets').catch(() => false)) {
      await fs.cp('site/assets', 'docs/assets', { recursive: true });
    }

    console.log('Assets copied successfully');
  } catch (error) {
    console.error('Error copying assets:', error);
    throw error;
  }
}

build();