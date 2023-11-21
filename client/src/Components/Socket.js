import socketIO from 'socket.io-client'
const socket = socketIO.connect('http://localhost:3333')

export default socket
