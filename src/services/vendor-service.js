import http from "./http";

export class VendorService {

    static all(paginationModel, filterModel, logicOperator) {
        
        return http.post(`/vendors/all`, {
            page: paginationModel.page+1,
            take: paginationModel.pageSize,
            filterModel,
            logicOperator
        });
    }

    static generatePDF(data, email, jobData) {
        return http.post('/vendors/generate_pdf', {
            data,
            email,
            jobData
        })
    }
}