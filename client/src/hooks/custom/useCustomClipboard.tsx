// src/hooks/useCustomClipboard.js

import { useState, useCallback } from "react";
import { useClipboard } from "use-clipboard-copy";

export const useCustomClipboard = () => {
  const [copyToast, setCopyToast] = useState({ visible: false, copied: false });
  const clipboard = useClipboard();

  const onCopyHandler = useCallback(() => {
    clipboard.copy();
    setCopyToast((prev) => ({ ...prev, copied: true }));
  }, [clipboard]);

  const onHoverHandler = useCallback((visible: boolean) => {
    setCopyToast((prev) => ({ ...prev, visible }));
    if (!visible) {
      setCopyToast((prev) => ({ ...prev, copied: false }));
    }
  }, []);

  return {
    clipboard,
    copyToast,
    onHoverHandler,
    onCopyHandler,
  };
};
