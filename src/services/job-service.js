import { beautyExpiry } from "src/utils";
import http from "./http";

export class JobService {
  static mine(job_id) {
    return http.post(`/job/mine`, { job_id });
  }

  static add(data) {
    data.cardholderDriversLicenseExpiry = beautyExpiry(data.cardholderDriversLicenseExpiry);
    data.expirationDate = beautyExpiry(data.expirationDate);
    return http.post("/job/add", { data });
  }

  static update(id, data) {
    return http.put(`/job/${id}`, data);
  }
}
