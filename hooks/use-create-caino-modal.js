import { create } from "zustand";

const useCreateCainoModal = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export { useCreateCainoModal };
