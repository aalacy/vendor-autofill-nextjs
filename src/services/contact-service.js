import http from "./http";

export class ContactService {
  static all(paginationModel, filterModel, logicOperator) {
    return http.post(`/contacts/all`, {
      page: paginationModel.page + 1,
      take: paginationModel.pageSize,
      filterModel: filterModel,
      logicOperator: logicOperator,
    });
  }

  static add(values) {
    return http.post("/contacts/add", { ...values });
  }

  static delete(id) {
    return http.delete(`/contacts/${id}`);
  }

  static update(id, data) {
    return http.put(`/contacts/${id}`, data);
  }
}
