export function apiHost() {
  if (process.env.REACT_APP_NYLAS_ENV === "production") {
    return "https://nylas-sales-demo-api.herokuapp.com"
  } else {
    return "http://localhost:5000"
  }
}
