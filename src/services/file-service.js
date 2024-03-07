import http from "./http";

export class FileService {

    static all(query, page, take, sortby) {
        
        return http.post(`/files/all`, {
            page: page,
            take,
            query,
            sortby
        });
    }

    static remove(key) {
        return http.post(`/files/delete`, { key });
    }
}