var path = require('path')
var fs = require('fs')

var browserify = require('browserify-middleware')
var express = require('express')
var app = express()

var lsVersion = require('./package.json').dependencies['lexical-scope']
var version = require('./package.json').version

browserify.settings('transform', ['rfileify'])

app.use(express.logger('dev'))
app.use(express.favicon('./favicon.ico'))

app.get('/', function (req, res) {
  res.type('html')
  var html = fs.readFileSync(__dirname + '/index.html', 'utf8')
  html = html.replace(/{{version}}/g, version)
  res.send(html)
})
app.get('/static/' + version + '/style.css', function (req, res) {
  res.type('css')
  var css = fs.readFileSync(__dirname + '/style.css', 'utf8')
  css = css.replace(/{{version}}/g, version)
  res.send(css)
})
app.get('/static/' + version + '/client.js', browserify('./client.js'))
app.get('/static/' + version + '/background.png', file('./background.png'))

function file(path) {
  return function (req, res, next) {
    res.sendfile(path)
  }
}

app.listen(3000)