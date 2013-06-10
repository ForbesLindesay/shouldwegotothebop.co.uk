var start = document.getElementById('start')
var next = document.getElementById('next')
var fin = document.getElementById('finally')
var slide1 = document.getElementById('slide1')
var slide2 = document.getElementById('slide2')

start.setAttribute('class', 'current')
setTimeout(function () {
  start.setAttribute('class', 'done')
  next.setAttribute('class', 'current')
  setTimeout(function () {
    fin.setAttribute('class', 'current')
    next.setAttribute('class', 'done')
    setTimeout(function () {
      slide1.setAttribute('style', 'display: none;')
      slide2.setAttribute('style', '')
    }, 3000)
  }, 3000)
}, 3000)