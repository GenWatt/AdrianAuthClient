export default function useDate() {
  const dateToString = (date?: string): string => {
    return date ? new Date(date).toLocaleDateString() : '-'
  }

  return { dateToString }
}
