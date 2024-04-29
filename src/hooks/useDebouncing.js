import { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setdebouncedValue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setdebouncedValue(value);
    }, delay);
    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, [value]);
  return debouncedValue;
};
export default useDebounce;
