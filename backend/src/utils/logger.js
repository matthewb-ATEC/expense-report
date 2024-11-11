export const info = (...params) => {
  // eslint-disable-next-line no-console
  console.log(...params)
}

export const error = (...params) => {
  // eslint-disable-next-line no-console
  console.error(...params)
}

export default {
  info,
  error,
}
