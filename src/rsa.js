const EC = require('elliptic').ec
const ec = new EC('secp256k1')
var keypair = ec.genKeyPair()

const res = {
  prv: keypair.getPrivate('hex').toString(),
  pub: keypair.getPublic('hex').toString(),
}

console.log(res)

// 1. 生成公私钥对
// 2. 公钥直接当成地址(或者截取公钥前20位)
// 3. 公钥可以通过私钥计算
