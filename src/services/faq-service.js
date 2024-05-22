import http from "./http";

export class FaqService {
  static all() {
    return http.get(`/faqs/all`);
  }

  static add(data) {
    return http.post("/faqs/add", data);
  }

  static update(id, data) {
    return http.put(`/faqs/${id}`, data);
  }

  static remove(id) {
    return http.delete(`/faqs/${id}`);
  }
}
