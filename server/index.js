const express = require('express')
const compression = require('compression')
const path = require('path')

const stripTrailingSlash = str => {
  return str.endsWith('/') ? str.slice(0, -1) : str
}

// setup serve directory
let buildDir = path.join(__dirname, 'build')
if (process.env.MODE === 'local') {
  buildDir = path.join(__dirname, '..', 'build')
}

// setup basename
const basename = process.env.BASENAME || '/'

// setup port
const port = parseInt(process.env.PORT) || 3000

const app = express()
app.use(compression()) // enable gzip

app.use(basename, express.static(buildDir))
app.get(stripTrailingSlash(basename) + '/*', (req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'))
})

app.listen(port)
