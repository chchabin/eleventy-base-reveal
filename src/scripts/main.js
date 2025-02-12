import Reveal from "reveal.js"
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js"
import Highlight from "reveal.js/plugin/highlight/highlight.esm.js"
import Notes from "reveal.js/plugin/notes/notes.esm.js"
import mermaid from "mermaid"

document.addEventListener("DOMContentLoaded", (event) => {
    // Initialize mermaid
    mermaid.initialize({ startOnLoad: false, theme: "neutral" })

    // Initialize Reveal.js
    const deck = new Reveal({
        controls: true,
        progress: true,
        center: true,
        hash: true,
        plugins: [Markdown, Highlight, Notes],
        // Add this option to ensure Markdown is processed
        markdown: {
            smartypants: true,
        },
    })

    // Setup Reveal.js
    deck.initialize()

    // Function to render Mermaid diagrams
    function renderMermaidDiagrams() {
        const mermaidDivs = document.querySelectorAll('.mermaid:not([data-processed="true"])')
        mermaidDivs.forEach((element) => {
            // Use mermaid API to render
            mermaid.render(`mermaid-${Date.now()}`, element.textContent).then(({ svg }) => {
                element.innerHTML = svg
                element.setAttribute("data-processed", "true")
            })
        })
    }

    // Render Mermaid diagrams after Reveal.js has fully loaded
    deck.on("ready", renderMermaidDiagrams)

    // Re-render Mermaid diagrams when a slide is shown (for lazy-loaded slides)
    deck.on("slidechanged", renderMermaidDiagrams)
})

