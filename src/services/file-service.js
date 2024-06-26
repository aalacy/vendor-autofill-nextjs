import http from "./http";

export class FileService {
  static all(query, page, take, sortby, job_id) {
    return http.post(`/files/all`, {
      page: page,
      take,
      query,
      sortby,
      job_id,
    });
  }

  static get(key) {
    return http.post(`/files/get`, { key });
  }

  static remove(key, is_folder, keys) {
    return http.post(`/files/delete`, { key, is_folder, keys });
  }

  static download(keys) {
    return http.post(`/files/download`, { keys });
  }
}
