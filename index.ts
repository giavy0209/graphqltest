import { graphqlHTTP } from 'express-graphql'
import schema from './schema'
import express from 'express'
import * as rootValue from './GraphRoot'
import './config'
import './connectDB'
import { auth } from './middleware'
const app = express()



app.use('/graphql',auth , graphqlHTTP({
    schema: schema,
    rootValue,
    graphiql: true,
}));
app.listen(global.Config.PORT);