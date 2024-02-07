import http from "./http";

export class VendorService {

    static all() {
        
        return http.post(`/vendors/all`, {
            page: 1,
            take: -1,
            filterModel: [],
            logicOperator: ""
        });
    }

    static generatePDF(data, email) {
        return http.post('/vendors/generate_pdf', {
            data,
            email,
        })
    }

    static readGSheet() {
        return http.get('/vendors/read_g_sheet')
    }
}