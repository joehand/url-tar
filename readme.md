# Url to Tarball

Stream url(s) to a tarball. 

Tries to write correct file extensions and index.html

## Usage

```javascript
var fs = require('fs')
var urlTar = require('url-tar')

var path = 'YourTarBall.tar'
var yourTarball = fs.createWriteStream(path)

// pipe the urlTar stream to your tar file
urlTar('http://google.com').pipe(yourTarball)
yourTarball.on('close', function () {
  console.log(path + ' has been written')
})
```
