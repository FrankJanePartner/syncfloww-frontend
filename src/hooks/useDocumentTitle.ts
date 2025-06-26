import { useEffect } from "react";

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const defaultTitle = "SyncFlow";
    document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;
  }, [title]);
};

export default useDocumentTitle;
