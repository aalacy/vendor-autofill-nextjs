import http from "./http";

export class HistoryService {

    static all(paginationModel, filterModel, logicOperator) {
        
        return http.post(`/history/all`, {
            page: paginationModel.page + 1,
            take: paginationModel.pageSize,
            filterModel: filterModel,
            logicOperator: logicOperator
        });
    }
}