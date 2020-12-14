export function authHeader() {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  if (accessToken) {
    return {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    }; // for Node.js Express back-end
  } else {
    return {};
  }
}
