import { useRef, useState, useEffect } from "react";

export const useDialog = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleClose = () => setIsOpen(false);
    el.addEventListener("close", handleClose);
    return () => el.removeEventListener("close", handleClose);
  }, []);

  const show = () => {
    ref.current?.showModal();
    setIsOpen(true);
  };

  const close = () => {
    ref.current?.close();
  };

  return { ref, isOpen, show, close };
};
