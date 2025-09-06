import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // ✅ Fetch all users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      console.error("getUsers error:", error);
      const msg = error.response?.data?.message || "Failed to fetch users";
      toast.error(msg);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // ✅ Fetch messages of selected user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.error("getMessages error:", error);
      const msg = error.response?.data?.message || "Failed to fetch messages";
      toast.error(msg);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // ✅ Send a message
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error("sendMessage error:", error);
      const msg = error.response?.data?.message || "Failed to send message";
      toast.error(msg);
    }
  },

  // ✅ Subscribe to real-time messages
  subscribeToMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("NewMessage", (newMessage) => {
      // Only update messages if it's from the selected user
      if (newMessage.senderId === selectedUser._id) {
        set({ messages: [...get().messages, newMessage] });
      }
    });
  },

  // ✅ Unsubscribe to prevent duplicate listeners
  unSubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("NewMessage");
  },

  // ✅ Set selected user
  setSelectedUser: (user) => {
    set({ selectedUser: user, messages: [] });
  },
}));
