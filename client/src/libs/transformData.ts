export const filteredData = <T>(data: Record<string, T>): Record<string, T> => {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([_, value]) =>
        typeof value === 'string' && (value as unknown as string).trim() !== ''
    )
  )
}
