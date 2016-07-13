var hyperdrive = require('hyperdrive')
var memdb = require('memdb')
var swarm = require('hyperdrive-archive-swarm')
var pump = require('pump')
var tarDat = require('tar-dat')
var urlTar = require('.')

var urls = ['http://google.com', 'https://www.npmjs.com/static/css/index.46210034.css']

var drive = hyperdrive(memdb())
var archive = drive.createArchive()

// Put websites inside a dat
pump(urlTar(urls), tarDat(archive), function (err) {
  if (err) throw err
  archive.finalize(function (err) {
    if (err) return console.error(err)
    console.log('key: ', archive.key.toString('hex'))
    swarm(archive)
  })
})
