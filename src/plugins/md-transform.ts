/**
 *Created by 夜雪暮歌 on 2021/2/25
 **/
import path from 'path'
import fs from 'fs'
import marked from 'marked'

const mdToJs = str => {
  const content = JSON.stringify(marked(str))
  return `export default ${content}`
}
const idMdFile = (path: string) => path.endsWith('.md')

export function mdTransform() {
  return {
    // for dev
    configureServer: [
      async ({ app }) => {
        app.use(async (ctx, next) => {
          if (idMdFile(ctx.path)) {
            ctx.type = 'js'
            const filePath = path.join(process.cwd(), ctx.path)
            ctx.body = mdToJs(fs.readFileSync(filePath).toString())
          } else {
            await next()
          }
        })
      }
    ],
    // for build
    transforms: [
      {
        test: context => idMdFile(context.path),
        transform: ({ code }) => mdToJs(code)
      }
    ]
  }
}

