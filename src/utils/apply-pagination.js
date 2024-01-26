export function applyPagination(documents, page, rowsPerPage) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

export const initialPage = {
  page: 0,
  pageSize: 5,
};