import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import highlightLines from 'markdown-it-highlight-lines'

const md = new MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs ${lang}"><code>${
          hljs.highlight(lang, str, true).value
        }</code></pre>`
      } catch (error) {
        console.log(error)
      }
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

md.use(highlightLines)

export default md
