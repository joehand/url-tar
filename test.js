var test = require('tape')
var fs = require('fs')
var urlTar = require('.')

test('puts files into tar', function (t) {
  var path = 'YourTarBall.tar'
  var yourTarball = fs.createWriteStream(path)
  urlTar('http://google.com').pipe(yourTarball)
  yourTarball.on('close', function () {
    fs.stat(path, function (err, stat) {
      t.error(err)
      t.ok(stat, 'tar ball written')
      t.end()
    })
  })
})
