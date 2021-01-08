// 1. 生成公私钥对
// 2. 公钥直接当成地址(或者截取公钥前20位)
// 3. 公钥可以通过私钥计算
const fs = require('fs')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')
let keypair = ec.genKeyPair()

function getPub(prv) {
  // 根据私钥计算公钥
  return ec.keyFromPrivate(prv).getPublic('hex').toString()
}

const res = generateKeys()
// console.log(res);

// 1. 获取公私钥对 (持久化)
function generateKeys() {
  const fileName = './wallet.json'
  try {
    let res = JSON.parse(fs.readFileSync(fileName))
    // 公私钥存在 并且 通过私钥 算出 是合法公钥
    if(res.prv && res.pub && getPub(res.prv) === res.pub) {
      keypair = ec.keyFromPrivate(res.prv)
      return res
    }
    else {
      // 验证失败 重新生成
      throw 'not vaild wallet.json'
    }
  } catch (e) {
    // 文件不存在 文件不合法 重新生成
    const res = {
      prv: keypair.getPrivate('hex').toString(),
      pub: keypair.getPublic('hex').toString()
    }

    fs.writeFileSync(fileName, JSON.stringify(res))
    return res
  }
}

// 2. 签名
function sign({from, to, amount}) {
  const bufferMsg = Buffer.from(`${from}-${to}-${amount}`)
  let signature = Buffer.from(keypair.sign(bufferMsg).toDER()).toString('hex')
  return signature
}

// 3. 校验签名 不需要私钥
function verify({from, to, amount, signature}, pub) {
  const keypairTemp = ec.keyFromPublic(pub, 'hex')
  const bufferMsg = Buffer.from(`${from}-${to}-${amount}`)
  return keypairTemp.verify(bufferMsg, signature)
}

const trans = {from: 'jenkin', to: 'woniu', amount: 100}
const trans1 = {from: 'jenkin', to: 'woniu', amount: 100}

const signature = sign(trans)
console.log(signature)
trans.signature = signature

const isVerify = verify(trans, res.pub)
console.log(isVerify)
