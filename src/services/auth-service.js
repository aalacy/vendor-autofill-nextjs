import http from "./http";

export class AuthService {
  static me() {
    return http.get("/users/");
  }

  static login(email, password, shouldRememberMe) {
    return http.post("/auth/login/", {
      email,
      password,
      shouldRememberMe,
    });
  }

  static register({ ...input }) {
    return http.post("/auth/register/", input);
  }

  static passwordRecovery(email) {
    return http.post("/auth/password-recovery/", { email });
  }

  static resendCode(email) {
    return http.post("/auth/password-recovery/", { email });
  }

  static forgotPasswordSubmit(email, code, password) {
    return http.post("/auth/reset-password-with-code/", {
      email,
      code,
      password,
    });
  }
}
