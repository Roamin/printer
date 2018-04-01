import  MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export default sMd => {
    return md.render(sMd)
}
