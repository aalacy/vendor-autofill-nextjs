import http from "./http";

export class MileageService {
  static all(paginationModel, filterModel, logicOperator) {
    return http.post(`/mileages/all`, {
      page: paginationModel.page + 1,
      take: paginationModel.pageSize,
      filterModel: filterModel,
      logicOperator: logicOperator,
    });
  }

  static add(values) {
    return http.post("/mileages/add", { ...values });
  }

  static get(id) {
    return http.get(`/mileages/${id}`);
  }

  static delete(id) {
    return http.delete(`/mileages/${id}`);
  }

  static update(id, data) {
    return http.put(`/mileages/${id}`, data);
  }
}
