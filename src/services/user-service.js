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

  static removeUser(id) {
    return http.delete(`/users/${id}`);
  }

  static updatePerson(userId, personId, data) {
    return http.put(`/users/update-person/${personId}/${userId}`, data);
  }

  static updateRole(id, data) {
    return http.put(`/users/update-role/${id}`, data);
  }

  static all(paginationModel, filterModel, logicOperator) {
    return http.post(`/users/all`, {
      page: paginationModel.page + 1,
      take: paginationModel.pageSize,
      filterModel: filterModel,
      logicOperator: logicOperator,
    });
  }

  static getAllRoles() {
    return http.get("/users/roles/all");
  }
}
