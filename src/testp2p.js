const dgram = require('dgram')
const upd = dgram.createSocket('udp4')

upd.on('message', (data, ipdr) => {
  console.log('accept message')
  console.log(data.toString())
  console.log(ipdr)
})

// upd.on('error', function(err) {
//   console.log('error')
//   console.log(arguments)
// })

upd.on('listening', function() {
  const address = upd.address()
  console.log('upd server is listening', address.address + ':' + address.port)
})

function send(message, port, host) {
  console.log('send message', message, port, host)
  upd.send(Buffer.from(message), port, host)
}
upd.bind(0)

const port = Number(process.argv[2])
const host = process.argv[3]
if(port && host) {
  send('NB', port, host)
}


console.log(process.argv)
