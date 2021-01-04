const vorpal = require('vorpal')()
const Table = require('cli-table')
const Blockchain = require('./blockchain')

// instantiate
// const table = new Table({
//     head: ['TH 1 label', 'TH 2 label'],
//     colWidths: [10, 20]
// });

// table is an Array, so you can `push`, `unshift`, `splice` and friends
// table.push(
//     ['First value', 'Second value'],
//     ['First value', 'Second value']
// );

function formatLog(data) {
  console.log(data)
  if(!Array(data)) {
    data = [data]
  }
  const first = data[0]
  const head = Object.keys(first)
  const table = new Table({
      head,
      colWidths: new Array(head.length).fill(20)
  });
  const res = data.map(v => {
    return head.map(h=> v[h])
  })

  table.push(...res);
  console.log(table.toString());
}

// table.push(
//     ['First value', 'Second value'],
//     ['First value', 'Second value']
// );

const blockchain = new Blockchain()

vorpal
  .command('mine', '挖矿')
  .action(function(args, callback) {
    const newBlock = blockchain.mine()
    if(newBlock) {
      formatLog(newBlock)
    }
    callback()
  })

vorpal
  .command('chain', '查看区块链')
  .action(function(args, callback) {
    formatLog(blockchain.blockchain)
    callback()
  })

vorpal
  .command('hello', '你好')
  .action(function(args, callback) {
    this.log('hello blockchain')
    callback()
  })

// vorpal
//   .command('hello', '你好')
//   .action(function(args, callback) {
//     this.log('hello blockchain')
//     callback()
//   })

console.log('Welcome to the blockchain world')
vorpal.exec('help')

vorpal
  .delimiter('$')
  .show()
