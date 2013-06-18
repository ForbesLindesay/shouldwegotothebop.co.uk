var path = require('path')
var fs = require('fs')

var express = require('express')
var app = express()

var version = require('./package.json').version

app.use(express.logger('dev'))
app.use(express.favicon('./favicon.ico'))

app.get('/', function (req, res) {
  res.type('html')
  var html = fs.readFileSync(__dirname + '/index.html', 'utf8')
  html = html.replace(/{{version}}/g, version)
  res.send(html)
})

app.get('/bop.manifest', function (req, res) {
  res.type('text/manifest')
  var html = fs.readFileSync(__dirname + '/bop.manifest', 'utf8')
  html = html.replace(/{{version}}/g, version)
             .replace(/{{time}}/g, (new Date).toISOString())
  res.send(html)
})

app.get('/static/' + version + '/style.css', function (req, res) {
  res.type('css')
  var css = fs.readFileSync(__dirname + '/style.css', 'utf8')
  css = css.replace(/{{version}}/g, version)
  res.send(css)
})
app.get('/static/' + version + '/background.png', file('./background.png'))
app.get('/static/' + version + '/image.png', file('./image.png'))

function file(path) {
  return function (req, res, next) {
    res.sendfile(path)
  }
}

app.listen(3000)