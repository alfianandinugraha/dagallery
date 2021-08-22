function getSingleArrayItem<T>(payload: T|T[]) {
  return Array.isArray(payload) ? payload[0] : payload
}

export {
  getSingleArrayItem
}