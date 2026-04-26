import { create } from 'zustand';

const useAppStore = create((set) => ({
  neighborhoodId: null,
  isLoginModalOpen: false,
  isNeighborhoodModalOpen: false,

  setNeighborhoodId: (id) => {
    set({ neighborhoodId: id });
    if (typeof window !== 'undefined') {
      if (id) {
        localStorage.setItem('neighborhoodId', id);
      } else {
        localStorage.removeItem('neighborhoodId');
      }
    }
  },
  
  initializeStore: () => {
    if (typeof window !== 'undefined') {
      const storedId = localStorage.getItem('neighborhoodId');
      if (storedId) {
        set({ neighborhoodId: storedId });
      }
    }
  },

  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),

  openNeighborhoodModal: () => set({ isNeighborhoodModalOpen: true }),
  closeNeighborhoodModal: () => set({ isNeighborhoodModalOpen: false }),
}));

export default useAppStore;
