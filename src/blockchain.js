const crypto = require('crypto')

const initBlock = {
  index: 0,
  data: 'hello blockchain',
  prevHash: '0',
  timestamp: 1609680407846,
  nonce: 103173,
  hash: '0000e615c0eeacb80284bb51501f6dc19a311cdd2e095a6376ac37a44e514170'
}

class BlockChain {

  constructor() {
    this.blockchain = [
      initBlock
    ]
    this.data = []
    this.difficulty = 4
  }

  // 最新区块
  getLastBlock() {
    return this.blockchain[this.blockchain.length-1]
  }

  // 挖矿
  mine() {
    // 1 生成新区块 一页新的账本加入区块链
    // 2 不停的算hash 直到符合难道 获得记账权

    const newBlock = this.generateNewBlock()

    // 区块合法 并且区块链合法 新增区块
    if(this.isVaildBlock(newBlock) && this.isValidChain()) {
      this.blockchain.push(newBlock)
    }
    else {
      console.log('Error Invaild Block')
    }
  }

  // 生成新区块
  generateNewBlock() {
    let nonce = 0
    const index = this.blockchain.length
    const data = this.data
    const prevHash = this.getLastBlock().hash
    let timestamp = Date.now()
    let hash = this.computeHash(index, prevHash, timestamp, data, nonce)
    
    while(hash.slice(0, this.difficulty) !== '0'.repeat(this.difficulty)) {
      nonce += 1
      hash = this.computeHash(index, prevHash, timestamp, data, nonce)
    }

    return {
      index,
      data,
      prevHash,
      timestamp,
      nonce,
      hash
    }
  }

  computeHashForBlock({index, prevHash, timestamp, data, nonce}) {
    return this.computeHash(index, prevHash, timestamp, data, nonce)
  }

  // 计算 hash
  computeHash(index, prevHash, timestamp, data, nonce) {
    return crypto
            .createHash('sha256')
            .update(index + prevHash + timestamp + data + nonce)
            .digest('hex')
  }

  // 校验区块
  isVaildBlock(newBlock, lastBlock=this.getLastBlock()) {
    // 1. 区块的index = 最新区块的 index + 1
    // 2. 区块的time 大于最新的区块
    // 3. 最新区块的prevHash 等于lastBlock区块的hash
    // 4. 区块的哈希值 难度符合要求
    // 5. 新区块hash计算正确
    if(newBlock.index !== lastBlock.index+1) {
      return false
    }
    else if(newBlock.timestamp <= lastBlock.timestamp) {
      return false
    }
    else if(newBlock.prevHash !== lastBlock.hash) {
      return false
    }
    else if(newBlock.hash.slice(0, this.difficulty) !== '0'.repeat(this.difficulty)) {
      return false
    }
    else if(newBlock.hash !== this.computeHashForBlock(newBlock)) {
      return false
    }
    return true
  }

  // 校验区块链
  isValidChain(chain=this.blockchain) {
    for(let i = chain.length-1; i >= 1; i--) {
      if(!this.isVaildBlock(chain[i], chain[i-1])) {
        return false
      }
      if(JSON.stringify(chain[0]) !== JSON.stringify(initBlock)) {
        return false
      }
    }
    return true
  }
}

const bc = new BlockChain()
bc.mine()
bc.blockchain[1].nonce = 22
bc.mine()
bc.mine()

console.log(bc.blockchain)
