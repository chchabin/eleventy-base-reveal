const markdownIt = require("markdown-it")
const esbuild = require("esbuild")

module.exports = function(eleventyConfig) {
    // Configurez markdown-it
    const markdownLibrary = markdownIt({
        html: true,
        breaks: false,
        linkify: true,
    })

    // Configurez le filtre splitSlides
    eleventyConfig.addFilter("splitSlides", (content) => {
        // Divisez le contenu en slides
        const slides = content.split("<hr>")

        // Enveloppez chaque slide dans une balise <section>
        return slides.map((slide) => `<section>${slide.trim()}</section>`).join("")
    })

    eleventyConfig.setLibrary("md", markdownLibrary)

    // Ajoutez cette transformation pour convertir --- en <hr>
    eleventyConfig.addTransform("markdownSlides", (content, outputPath) => {
        if (outputPath && outputPath.endsWith(".html")) {
            return content.replace(/\n---\n/g, "\n<hr>\n")
        }
        return content
    })

    // Modifiez la transformation Mermaid
    eleventyConfig.addTransform("mermaidTransform", (content, outputPath) => {
        if (outputPath && outputPath.endsWith(".html")) {
            return content.replace(
                /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
                (match, p1) => `<div class="mermaid">${p1.trim()}</div>`,
            )
        }
        return content
    })

    // Copiez des fichiers statiques
    eleventyConfig.addPassthroughCopy({
        'node_modules/reveal.js/dist': 'reveal.js',
        'node_modules/reveal.js/plugin': 'reveal.js/plugin',
        "src/styles": "styles",
    });


// Collection pour les présentations
    eleventyConfig.addCollection("presentations", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/presentations/**/*.md");
    });

    // Bundling des scripts avec esbuild
    eleventyConfig.on("eleventy.before", async () => {
        await esbuild.build({
            entryPoints: ["src/scripts/main.js"],
            bundle: true,
            outfile: "_site/scripts/bundle.js",
            format: "esm",
        })
    })

    return {
        dir: {
            input: 'src',
            output: '_site',
            includes: '_includes',
            layouts: '_layouts'
        }
    };
};