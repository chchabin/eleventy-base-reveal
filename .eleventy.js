const path = require('path');

module.exports = function(eleventyConfig) {
    // Copiez les fichiers statiques de Reveal.js
    eleventyConfig.addPassthroughCopy({
        'node_modules/reveal.js/dist': 'reveal.js',
        'node_modules/reveal.js/plugin': 'reveal.js/plugin',
    });

    // Configuration pour les fichiers Markdown
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: "<!-- excerpt -->"
    });
    // Ajoutez ce filtre personnalisé
    eleventyConfig.addFilter("splitSlides", function(content) {
        return content.split('<hr>').map(slide => slide.trim());
    });
// Ajoutez cette ligne pour créer une collection de présentations
    eleventyConfig.addCollection("presentations", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/presentations/*.md");
    });

    return {
        dir: {
            input: 'src',
            output: '_site',
            includes: '_includes',
            layouts: '_layouts'
        }
    };
};