import { beautyExpiry } from "src/utils";
import http from "./http";

export class JobService {
  static mine(job_id) {
    return http.post(`/job/mine`, { job_id });
  }

  static add(data) {
    data.DLExpiry = beautyExpiry(data.DLExpiry);
    data.expDate = beautyExpiry(data.expDate);
    return http.post("/job/add", { data });
  }

  static update(id, data) {
    return http.put(`/job/${id}`, data);
  }

  static remove(id) {
    return http.delete(`/job/${id}`);
  }
}
