import { useCallback, useState } from "react";

const useSidebar = () => {
  // Setup the isOpen boilerplate
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = (evt, open) => {
    if (evt.type === "keydown" && (evt.key === "Tab" || evt.key === "Shift")) {
      return;
    }

    setIsOpen(open);
  };

  const open = useCallback(
    evt => {
      toggleSidebar(evt, true);
    },
    [setIsOpen],
  );

  const close = useCallback(
    evt => {
      toggleSidebar(evt, false);
    },
    [setIsOpen],
  );

  return {
    isOpen,
    open,
    close,
  };
};

export default useSidebar;
