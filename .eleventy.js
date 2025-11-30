module.exports = async function (eleventyConfig) {
  // Copy directly from src to public folder
  eleventyConfig.addPassthroughCopy("src/_css");
  eleventyConfig.addPassthroughCopy("src/_assets");

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
  });

  // Human-readable date
  eleventyConfig.addFilter("date", function (date) {
    const d = new Date(date);
    const options = { year: "numeric", month: "long" };
    return d.toLocaleDateString("en-AU", options);
  });

  // ISO date for sitemap
  eleventyConfig.addFilter("isoDate", function (date) {
    return new Date(date).toISOString().split("T")[0];
  });

  // RSS date format
  eleventyConfig.addFilter("rssDate", function (date) {
    return new Date(date).toUTCString();
  });

  // Limit filter for RSS
  eleventyConfig.addFilter("head", function (array, n) {
    return array.slice(0, n);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "public",
      data: "_data"
    },
    templateFormats: ["njk", "html", "md", "txt", "json"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
