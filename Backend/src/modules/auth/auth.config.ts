export const COOKIE_NAME: string = (() => {
  const name = process.env.COOKIE_NAME
  if (!name) {
    throw new Error("COOKIE_NAME is not defined in environment variables")
  }
  return name
})()
