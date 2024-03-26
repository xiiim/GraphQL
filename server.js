var { graphql, buildSchema } = require("graphql")
var express = require('express')
var { createHandler } = require('graphql-http/lib/use/express')
var { ruruHTML } = require('ruru/server')

var schema = buildSchema(`
  type Query {
    hello: String
    age: Int
  }
`)

var rootValue = { 
  hello: () => "Hello world!", 
  age: () => 8,
}


const app = express()

app.all('/graphql', createHandler({ schema, rootValue }))

app.get('/', (_req, res) => {
  res.type('html')
  res.end(ruruHTML({ endpoint: '/graphql' }))
})

app.listen(4000)
console.log("Api running on: http://localhost:4000")