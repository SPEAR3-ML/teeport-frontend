const express = require('express')
const path = require('path')

let buildDir = path.join(__dirname, 'build')
if (process.env.MODE === 'local') {
  buildDir = path.join(__dirname, '..', 'build')
}

const app = express()
app.use('/teeport', express.static(buildDir))
app.get('/teeport/*', (req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'))
})
app.listen(3000)
