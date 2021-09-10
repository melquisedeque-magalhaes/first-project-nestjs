import { createHmac } from 'crypto'
import { encode } from 'base64-url'

const header = {
    algoritmo: 'HS256',
    type: 'JWT'
}

const payload = {
    username: 'Melqui',
    name: 'Melqui',
    exp: new Date().getTime() // timestamp
}

const key = 'eadb1c036437e9854e304b4f1c6ddbd8'

const headerEncoded = encode(JSON.stringify(header))
const payloadEncoded = encode((JSON.stringify(payload)))

const signature = createHmac('sha256', key)
    .update(`${headerEncoded}.${payloadEncoded}`).digest("base64")

console.log(`${headerEncoded}.${payloadEncoded}.${encode(signature)}`)