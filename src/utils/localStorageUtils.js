// utils/localStorageUtils.js
export const loadFromLocalStorage = (key) => {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error("Error loading from local storage", err);
      return undefined;
    }
  };
  
  export const saveToLocalStorage = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error("Error saving to local storage", err);
    }
  };
  