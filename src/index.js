const vorpal = require('vorpal')()
const Table = require('cli-table')
const Blockchain = require('./blockchain')

function formatLog(data) {
  if(!Array.isArray(data)) {
    data = [data]
  }
  const first = data[0]
  const head = Object.keys(first)
  const table = new Table({
      head,
      colWidths: new Array(head.length).fill(20)
  })
  const res = data.map(v => {
    return head.map(h => JSON.stringify(v[h], null, 1))
  })

  table.push(...res)
  console.log(table.toString())
}

const blockchain = new Blockchain()

vorpal
  .command('trans <from> <to> <amount>', 'transfer')
  .action(function(args, callback) {
    const {from, to, amount} = args
    let trans = blockchain.transfer(from, to, amount)
    if(trans) {
      formatLog(trans)
    }
    callback()
  })

vorpal
  .command('blance <address>', 'blance')
  .action(function(args, callback) {
    const blance = blockchain.blance(args.address)
    if(blance) {
      formatLog({blance, address: args.address})
    }
    else {

    }
    callback()
  })

vorpal
  .command('detail <index>', 'view blockchain')
  .action(function(args, callback) {
    const { index } = args
    const block = blockchain.blockchain[index]
    this.log(JSON.stringify(block, null, 2))
    callback()
  })

vorpal
  .command('mine <address>', 'mine')
  .action(function(args, callback) {
    const { address } = args
    const newBlock = blockchain.mine(address)
    if(newBlock) {
      formatLog(newBlock)
    }
    callback()
  })

vorpal
  .command('chain', 'view the blockchain')
  .action(function(args, callback) {
    formatLog(blockchain.blockchain)
    callback()
  })

vorpal
  .command('hello', 'hello')
  .action(function(args, callback) {
    this.log('hello blockchain')
    callback()
  })

console.log('Welcome to the blockchain world')

vorpal.exec('help')

vorpal
  .delimiter('$')
  .show()
