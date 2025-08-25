// frontend/src/hooks/useSocket.js
import { useEffect } from "react";
import { io } from "socket.io-client";
import useStore from "../store/useStore";
import routeMap from "../services/routeMap";

let socket;

export default function useSocket() {
  const addNotification = useStore((s) => s.addNotification);
  useEffect(() => {
    const apiBase = routeMap.socket || window.location.origin;
    socket = io(apiBase, { transports: ["websocket","polling"] });

    socket.on("connect", () => {
      console.log("socket connected", socket.id);
    });

    socket.on("newItemPosted", (payload) => {
      addNotification({
        id: Date.now(),
        type: 'new_item',
        title: 'New Item Posted',
        message: `A new ${payload.type.toLowerCase()} item has been reported: ${payload.itemName}`,
        timestamp: new Date().toISOString()
      });
    });

    socket.on("itemDeleted", (itemId) => {
      addNotification({
        id: Date.now(),
        type: 'item_deleted',
        title: 'Item Removed',
        message: 'An item has been removed from the system',
        timestamp: new Date().toISOString()
      });
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, [addNotification]);
  return socket;
}