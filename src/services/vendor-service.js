import http from "./http";

export class VendorService {

    static all() {
        return http.get('/vendors');
    }

    static generatePDF(data, email, jobData) {
        return http.post('/vendors/generate_pdf', {
            data,
            email,
            jobData
        })
    }
}