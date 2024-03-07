import http from "./http";

export class JobService {
  static mine() {
    return http.post(`/job/mine`);
  }

  static add(data) {
    return http.post("/job/add", { data });
  }
}
