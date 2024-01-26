import http from "./http";

export class VendorService {

    static all() {
        return http.get('/vendors');
    }

    static generatePDF(ids, email, jobData) {
        return http.post('/vendors/generate_pdf', {
            ids,
            email,
            jobData
        })
    }
}