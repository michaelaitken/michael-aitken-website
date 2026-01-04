const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginTOC = require("eleventy-plugin-toc");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
// const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");

module.exports = async function (eleventyConfig) {
  // -------------------------
  // Passthrough copies
  // -------------------------
  eleventyConfig.addPassthroughCopy("src/_assets");
  // eleventyConfig.addPassthroughCopy("src/_css");
  eleventyConfig.addPassthroughCopy("src/_js");

  // -------------------------
  // Markdown configuration with callouts
  // -------------------------
  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "header-anchor",
      symbol: "#",
    }),
    level: [2, 3, 4],
    slugify: (s) =>
      s
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-"),
  });

  // Custom callout blocks: > [!note], > [!warning], > [!tip], > [!info]
  md.core.ruler.after("block", "callout", (state) => {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === "blockquote_open") {
        const contentToken = tokens[i + 2];
        if (contentToken && contentToken.type === "inline") {
          const match = contentToken.content.match(
            /^\[!(note|warning|tip|info)\]\s*/i
          );
          if (match) {
            const type = match[1].toLowerCase();
            tokens[i].attrJoin("class", `callout callout-${type}`);
            contentToken.content = contentToken.content
              .replace(match[0], "")
              .trim();
            // Add callout title
            contentToken.content =
              `<span class="callout-title">${type}</span>` +
              contentToken.content;
          }
        }
      }
    }
  });

  eleventyConfig.setLibrary("md", md);

  // -------------------------
  // Plugins
  // -------------------------
  // eleventyConfig.addPlugin(bundlerPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3"],
    wrapper: "nav",
    wrapperClass: "toc",
    ul: true,
  });

  // -------------------------
  // Shortcodes
  // -------------------------
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // -------------------------
  // Filters
  // -------------------------
  eleventyConfig.addFilter("formatDate", (date) => {
    return new Date(date).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
    });
  });

  eleventyConfig.addFilter("isoDate", (dateVal) => {
    if (!dateVal) return "";
    const date = new Date(dateVal);
    // If date is invalid, return empty string
    if (isNaN(date.getTime())) return "";
    // Returns YYYY-MM-DD
    return date.toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("sortByOrder", (collection) => {
    return [...collection].sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  // Get breadcrumb trail from URL
  eleventyConfig.addFilter("breadcrumbs", (url) => {
    const parts = url.split("/").filter(Boolean);
    const crumbs = [];
    let path = "";
    for (const part of parts) {
      path += `/${part}`;
      crumbs.push({
        label: part
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        url: path + "/",
      });
    }
    return crumbs;
  });

  // Get sibling and child pages for sidebar navigation
  eleventyConfig.addFilter("getNavItems", (collections, url) => {
    const knowledge = collections.knowledge || [];
    const currentPath = url.split("/").filter(Boolean);

    // Find items at same level or one level deeper
    return knowledge.filter((item) => {
      const itemPath = item.url.split("/").filter(Boolean);
      // Same parent directory
      if (itemPath.length <= currentPath.length + 1) {
        const parentMatch = currentPath
          .slice(0, -1)
          .every((seg, i) => itemPath[i] === seg);
        return parentMatch;
      }
      return false;
    });
  });

  // -------------------------
  // Collections
  // -------------------------
  eleventyConfig.addCollection("knowledge", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/content/knowledge/**/*.md");
  });

  // -------------------------
  // Watch targets
  // -------------------------
  eleventyConfig.addWatchTarget("src/_css/");
  eleventyConfig.addWatchTarget("src/_js/");
  eleventyConfig.addWatchTarget("src/_includes/components/");

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
