const fs = require("fs").promises;
const path = require("path");
const { JSDOM } = require("jsdom");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const marked = require("marked");
const yaml = require("js-yaml");

async function build() {
  try {
    console.log("🏗️ Starting build process...");

    // Clean docs directory
    console.log("🧹 Cleaning docs directory...");
    await fs.rm("docs", { recursive: true, force: true });
    await fs.mkdir("docs", { recursive: true });

    // Read content
    console.log("📚 Reading content...");
    const posts = await readContent("site/content/posts");
    const pages = await readContent("site/content/pages");

    // Generate routes
    const routes = [
      { path: "/", template: "home", title: "MarkVault - Home" },
      { path: "/posts", template: "posts", title: "All Posts - MarkVault" },
      { path: "/about", template: "about", title: "About - MarkVault" },
      ...posts.map((post) => ({
        path: `/posts/${post.slug}`,
        template: "post",
        title: `${post.metadata.title} - MarkVault`,
        data: post,
      })),
    ];

    console.log(
      "🔨 Generating static HTML for routes:",
      routes.map((r) => r.path)
    );

    // Generate HTML for each route
    for (const route of routes) {
      const html = await generateHTML(route);
      const fileName =
        route.path === "/" ? "index.html" : `${route.path}/index.html`;

      await fs.mkdir(path.join("docs", path.dirname(fileName)), {
        recursive: true,
      });
      await fs.writeFile(path.join("docs", fileName), html);
    }

    // Copy assets and generate additional files
    console.log("📂 Copying assets and generating additional files...");
    await copyAssets();
    await generateSitemap(routes);
    await generateRobotsTxt();
    await fs.writeFile("docs/.nojekyll", "");

    console.log("✅ Build completed successfully!");
    console.log("📦 Output directory: ./docs");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

async function readContent(dir) {
  const files = await fs.readdir(dir);
  const content = [];

  for (const file of files) {
    if (file.endsWith(".md")) {
      const fileContent = await fs.readFile(path.join(dir, file), "utf-8");
      const { metadata, content: markdown } = parseMarkdown(fileContent);
      content.push({
        slug: file.replace(".md", ""),
        metadata,
        content: marked(markdown),
      });
    }
  }

  return content;
}

function parseMarkdown(content) {
  const parts = content.split("---\n");
  if (parts.length < 3) {
    return { metadata: {}, content };
  }

  const metadata = yaml.load(parts[1]);
  const markdown = parts.slice(2).join("---\n");
  return { metadata, content: markdown };
}

async function generateHTML({ path, template, title, data }) {
  const baseTemplate = await fs.readFile("site/index.html", "utf-8");
  const dom = new JSDOM(baseTemplate);
  const { document } = dom.window;

  // Update meta tags
  document.title = title;
  updateMetaTags(document, { title, path, data });

  // Pre-render content
  const content = await renderTemplate(template, data);
  document.getElementById("root").innerHTML = content;

  // Add preload hints
  addPreloadHints(document);

  return dom.serialize();
}

function updateMetaTags(document, { title, path, data }) {
  const meta = {
    description:
      data?.metadata?.description ||
      "MarkVault - Preserving digital content for generations",
    "og:title": title,
    "og:description":
      data?.metadata?.description ||
      "MarkVault - A modern markdown-powered platform",
    "og:url": `https://univault-org.github.io/MarkVault${path}`,
    "og:type": "website",
    "twitter:card": "summary_large_image",
  };

  Object.entries(meta).forEach(([name, content]) => {
    const tag = document.createElement("meta");
    if (name.startsWith("og:")) {
      tag.setAttribute("property", name);
    } else {
      tag.setAttribute("name", name);
    }
    tag.setAttribute("content", content);
    document.head.appendChild(tag);
  });
}

async function renderTemplate(template, data) {
  // Import your React components here
  const components = {
    home: () => `<div class="home">...</div>`,
    posts: () => `<div class="posts">...</div>`,
    post: (data) => `
      <article>
        <h1>${data.metadata.title}</h1>
        <div class="content">${data.content}</div>
      </article>
    `,
  };

  return components[template](data);
}

async function generateSitemap(routes) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map(
          (route) => `
        <url>
          <loc>https://univault-org.github.io/MarkVault${route.path}</loc>
          <changefreq>weekly</changefreq>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  await fs.writeFile("docs/sitemap.xml", sitemap);
}

async function generateRobotsTxt() {
  const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://univault-org.github.io/MarkVault/sitemap.xml`;

  await fs.writeFile("docs/robots.txt", robotsTxt);
}

async function copyAssets() {
  try {
    // Create necessary directories
    await fs.mkdir("docs/content", { recursive: true });
    await fs.mkdir("docs/assets/images", { recursive: true });

    console.log("📂 Copying content and assets...");

    // Copy content directory
    console.log("📚 Copying content...");
    await fs.cp("site/content", "docs/content", { recursive: true });

    // Copy images specifically
    console.log("🖼️ Copying images...");
    const imagesPath = "site/assets/images";
    if (
      await fs
        .access(imagesPath)
        .then(() => true)
        .catch(() => false)
    ) {
      await fs.cp(imagesPath, "docs/assets/images", { recursive: true });
      console.log("✅ Images copied successfully");
    } else {
      console.warn("⚠️ No images directory found at:", imagesPath);
    }

    // Verify image exists
    const bookImagePath = "docs/assets/images/book.jpg";
    if (
      await fs
        .access(bookImagePath)
        .then(() => true)
        .catch(() => false)
    ) {
      console.log("✅ Book image verified at:", bookImagePath);
    } else {
      console.error("❌ Book image not found at:", bookImagePath);
    }

    console.log("📦 All assets copied successfully");
  } catch (error) {
    console.error("❌ Error copying assets:", error);
    console.error("Error details:", error.message);
    throw error;
  }
}

build();
