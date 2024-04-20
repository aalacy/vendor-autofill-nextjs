import http from "./http";

export class VendorService {

    static add(values) {
        return http.post("/vendors/add", { ...values });
      }

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

    static generateOnePDF(vendor_id, invoice_name) {
        return http.post('/vendors/generate_one_pdf', {
            vendor_id,
            invoice_name,
        })
    }

    static readGSheet() {
        return http.get('/vendors/read_g_sheet')
    }
}