// const markdownIt = require("markdown-it");
// const markdownItAnchor = require("markdown-it-anchor");
// const pluginTOC = require("eleventy-plugin-toc");
// const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
// const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");

module.exports = async function (eleventyConfig) {
  // -------------------------
  // Passthrough copies
  // -------------------------
  eleventyConfig.addPassthroughCopy("src/_assets");
  // eleventyConfig.addPassthroughCopy("src/_css");
  eleventyConfig.addPassthroughCopy("src/_js");

  // -------------------------
  // Watch targets
  // -------------------------
  eleventyConfig.addWatchTarget("src/_assets/");
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
