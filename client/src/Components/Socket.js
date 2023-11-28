import socketIO from 'socket.io-client'
const URL = process.env.REACT_APP_BASE_URL

const socket = socketIO.connect(URL, { withCredentials: true })

export default socket
