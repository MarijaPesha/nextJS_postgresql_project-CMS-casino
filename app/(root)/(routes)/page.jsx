"use client";

import { useCreateCainoModal } from "@/hooks/use-create-caino-modal";
import { useEffect } from "react";

const SetupPage = () => {
  const isOpen = useCreateCainoModal((state) => state.isOpen);
  const onOpen = useCreateCainoModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
