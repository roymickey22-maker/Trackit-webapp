// src/utils/notify.js
import { io } from '../socket.js';

export const emitNotification = (eventName, payload) => {
  try {
    if (io) {
      io.emit(eventName, payload);
      console.log(`Notification emitted: ${eventName}`);
    }
  } catch (err) {
    console.warn('Socket not ready to emit:', err.message);
  }
};