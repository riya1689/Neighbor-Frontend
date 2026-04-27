"use client";

import NeighborhoodModal from "../home/NeighborhoodModal";
import LoginModal from "../auth/LoginModal";
import { useEffect } from "react";
import useAppStore from "@/store/useAppStore";

export default function GlobalModals() {
  const initializeStore = useAppStore((state) => state.initializeStore);

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return (
    <>
      <NeighborhoodModal />
      <LoginModal />
    </>
  );
}
