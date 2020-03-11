export function userLogin(payload) {
  return { type: "LOGGEDIN", payload }
};
export function userLogout(){
  return { type: "LOGOUT" }
};