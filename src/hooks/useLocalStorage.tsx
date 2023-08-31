export default function useLocalStorage() {
  const setObject = (key: string, object: object) => {
    if (object) {
      localStorage.setItem(key, JSON.stringify(object))
    }
  }

  const getObject = (key: string): string | null => {
    try {
      const object = localStorage.getItem(key)
    
      return object ? JSON.parse(object) : null
    } catch (error) {
      return null
    }
  }

  return { setObject, getObject }
}
