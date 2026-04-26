"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import useAppStore from "@/store/useAppStore";
import api from "@/lib/api";

export default function NeighborhoodModal() {
  const { isNeighborhoodModalOpen, closeNeighborhoodModal, setNeighborhoodId } = useAppStore();
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isNeighborhoodModalOpen) {
      fetchNeighborhoods();
    }
  }, [isNeighborhoodModalOpen]);

  const fetchNeighborhoods = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/neighborhoods');
      // Support arrays directly or wrapped data objects
      const data = response.data?.data || response.data || [];
      // Additional fallback check for safety if array is deeply nested
      if(Array.isArray(data)) {
        setNeighborhoods(data);
      } else if (response.data?.neighborhoods && Array.isArray(response.data.neighborhoods)) {
        setNeighborhoods(response.data.neighborhoods);
      } else {
        throw new Error('Invalid format');
      }
    } catch (error) {
      // Mock fallback
      setNeighborhoods([
        { id: "cm0abc123", name: "Downtown Heights", city: "New York" },
        { id: "cm0def456", name: "Sunnyvale Estates", city: "Sunnyvale" },
        { id: "cm0ghi789", name: "Westside Community", city: "Los Angeles" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id) => {
    setNeighborhoodId(id);
    closeNeighborhoodModal();
    window.location.reload(); 
  };

  return (
    <Modal isOpen={isNeighborhoodModalOpen} onClose={closeNeighborhoodModal} title="Select Your Neighborhood">
      <div className="space-y-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Please select a neighborhood to view relevant posts and connect with locals.
        </p>
        
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {neighborhoods.map((n) => (
              <button
                key={n.id}
                onClick={() => handleSelect(n.id)}
                className="w-full text-left px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-amber hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all flex justify-between items-center group"
              >
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-amber">{n.name}</div>
                  <div className="text-xs text-gray-500">{n.city}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
