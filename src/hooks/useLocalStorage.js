export const useLocalStorage = (key) => {
  const setItemLocalStorage = (value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };
  const getItemLocalStorage = (key) => {
    try {
      localStorage.getItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteItemLocalStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  return { setItemLocalStorage, getItemLocalStorage, deleteItemLocalStorage };
};
