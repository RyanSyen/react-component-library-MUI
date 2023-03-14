import { useCallback, useState } from "react";

const usePopup = () => {
  const [popup, setPopup] = useState({
    isOpen: false,
    title: "",
    popup: {},
    cancel: {},
  });

  const close = useCallback(() => {
    setPopup(prevState => {
      return {
        ...prevState,
        isOpen: false,
      };
    });
  }, [setPopup]);

  const cancel = {
    onClick: () => {
      close();
    },
  };

  const open = useCallback(
    (title, targetPopup, targetCancel) => {
      setPopup(prevState => {
        return {
          ...prevState,
          isOpen: true,
          title,
          popup: targetPopup,
          cancel: {
            ...cancel,
            ...targetCancel,
          },
        };
      });
    },
    [setPopup],
  );

  return {
    isOpen: popup.isOpen,
    open,
    close,
    title: popup.title,
    popup: popup.popup,
    cancel: popup.cancel,
  };
};

export default usePopup;
