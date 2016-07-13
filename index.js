var url = require('url')
var debug = require('debug')('url-tar')
var mime = require('mime-types')
var request = require('request')
var tar = require('tar-stream')

module.exports = function (urls) {
  if (typeof urls === 'string') urls = [urls]
  var pack = tar.pack()
  var pending = urls.length

  urls.forEach(function (urlString) {
    url2Pack(urlString, function (err) {
      if (err) throw err
      pending--
      if (!pending) {
        debug('finalizing pack')
        pack.finalize()
      }
    })
  })

  function url2Pack (urlString, cb) {
    var name = urlString.replace(/^https?:\/\//i, '')
    var isRoot = (name === url.parse(urlString).host)
    if (name.endsWith('/')) name += 'index.html'
    else if (isRoot) name += '/index.html'

    debug('requesting', urlString)
    request(urlString, function (err, response, body) {
      if (err) cb(err)
      if (response.statusCode === 200) {
        if (response.headers && response.headers['content-type']) {
          var ext = mime.extension(response.headers['content-type'])
          if (!name.endsWith(ext)) name += '.' + ext
        }

        debug('adding to pack ', name)
        pack.entry({ name: name }, body)
        cb(null)
      }
    })
  }

  return pack
}
