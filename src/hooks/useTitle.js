import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} -My Laundry House`;
  }, [title]);
};
export default useTitle;
