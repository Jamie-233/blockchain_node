const vorpal = require('vorpal')()
const Blockchain = require('./blockchain')

const blockchain = new Blockchain()

vorpal
  .command('mine', '挖矿')
  .action(function(args, callback) {
    const newBlock = blockchain.mine()
    if(newBlock) {
      console.log(newBlock)
    }
    callback()
  })

vorpal
  .command('chain', '查看区块链')
  .action(function(args, callback) {
    this.log(blockchain.blockchain)
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
