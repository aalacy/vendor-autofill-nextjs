import http from "./http";

export class JobService {

    static mine() {
        return http.post(`/job/mine`);
    }
}