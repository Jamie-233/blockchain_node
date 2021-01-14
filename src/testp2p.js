const dgram = require('dgram')

const upd = dgram.createSocket('udp4')

upd.on('message', (data, remote) => {
  console.log('accept message' + data.toString())
  console.log(remote)
})

upd.on('listening', function() {
  const address = upd.address()
  console.log('upd server is listening', address.address + ':' + address.port)
})

upd.bind(8002)

function send(message, port, host) {
  console.log('send message', message, port, host)
  upd.send(Buffer.from(message), port, host)
}

const port = Number(process.argv[2])
const port = Number(process.argv[3])
if(port && host) {
  send('NB', port, host)
}
upd.bind(8002)

console.log(process.argv)
