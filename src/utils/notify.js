// BoltPatch: Enhanced notification utility with better error handling
import { io } from '../socket.js';

export const emitNotification = (eventName, payload) => {
  try {
    if (io && io.emit) {
      io.emit(eventName, payload);
      console.log(`Notification emitted: ${eventName}`, payload);
    } else {
      console.warn('Socket.io instance not available for notification:', eventName);
    }
  } catch (err) {
    console.warn('Failed to emit notification:', eventName, err.message);
  }
};

// BoltPatch: Additional helper for specific notification types
export const notifyItemCreated = (item) => {
  emitNotification('newItemPosted', item);
};

export const notifyItemUpdated = (item) => {
  emitNotification('itemUpdated', item);
};

export const notifyItemDeleted = (itemId) => {
  emitNotification('itemDeleted', itemId);
};