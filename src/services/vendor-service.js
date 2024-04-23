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

    static readW9(vendor_id) {
        return http.post('/vendors/generate_w9', vendor_id)
    }

    static sendEmail(vendor_id, key, email, invoice_name) {
        return http.post('/vendors/send-invoice-via-email', {
            vendor_id,
            key,
            email,
            invoice_name
        })
    }

    static uploadCOI(vendor_id, vendor_name, file, onUploadProgress = undefined) {
        let formData = new FormData();

        formData.append("file", file);
        formData.append('vendor_id', vendor_id)
        formData.append('vendor_name', vendor_name)

        return http.post("/vendors/upload-coi", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    static readCOI(key) {
        return http.post(`/vendors/get-coi`, key)
    }
}