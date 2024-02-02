import http from "./http";

export class UserService {

  static uploadAvatar(file, onUploadProgress = undefined) {
    let formData = new FormData();

    formData.append("avatar", file);

    return http.post("/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  static updateUser(id, data) {
    return http.put(`/users/${id}`, data);
  }
}