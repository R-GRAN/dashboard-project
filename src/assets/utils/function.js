
export function storeInLocalStorage(token, adminId) {
  localStorage.setItem("token", token);
  localStorage.setItem("adminId", adminId);
}

