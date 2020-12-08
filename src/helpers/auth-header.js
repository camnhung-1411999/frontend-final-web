export function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return {
      Authorization: "Bearer " + user.accessToken,
      "Content-Type": "application/json",
    }; // for Node.js Express back-end
  } else {
    return {};
  }
}
