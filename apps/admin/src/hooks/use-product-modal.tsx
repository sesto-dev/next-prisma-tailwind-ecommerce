import { create } from 'zustand'

interface useProductModalStore {
   isOpen: boolean
   isEdit: boolean
   editId?: string
   onOpen: () => void
   onEdit: (id: string) => void
   onClose: () => void
}

export const useProductModal = create<useProductModalStore>((set) => ({
   isOpen: false,
   isEdit: false,
   editId: undefined,
   onOpen: () => set({ isOpen: true }),
   onEdit: (id: string) => set({ isOpen: true, isEdit: true, editId: id }),
   onClose: () => set({ isOpen: false, isEdit: false, editId: undefined }),
}))
