import { io, Socket } from 'socket.io-client';

const URL = 'https://creda-backend.onrender.com';

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(URL, {
      transports: ['websocket'],
      reconnection: true,
      secure: true,
    });
  }
  return socket;
};
