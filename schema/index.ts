import fs from 'fs'
import path from 'path'
import { buildSchema } from 'graphql'

const schemaDir = fs.readdirSync(__dirname)

let schemaString = schemaDir.filter(o => o !== 'index.ts')
  .map((_schema) => require(path.join(__dirname, _schema)).default)
  .join('\n')

export default buildSchema(`
${schemaString}
  type Query {
    user : Users,
    create(username : String , password : String) : String
  }
`);