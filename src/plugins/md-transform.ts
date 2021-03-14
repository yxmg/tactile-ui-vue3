/**
 *Created by 夜雪暮歌 on 2021/2/25
 **/
import marked from 'marked'

const mdToJs = str => {
  const content = JSON.stringify(marked(str))
  return `export default ${content}`
}
const idMdFile = (path: string) => path.endsWith('.md')

export function mdTransform() {
  return {
    name: 'transform-md-file',
    // for dev and build
    transform(src, id) {
      if (idMdFile(id)) {
        return {
          code: mdToJs(src),
          map: null // provide source map if available
        }
      }
    }
  }
}

