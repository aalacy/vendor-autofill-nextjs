export function applyPagination(documents, page, rowsPerPage) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

export const initialPage = {
  page: 0,
  pageSize: 5,
};

export const updateList = (existingList, newObject) => {
  const index = existingList.findIndex((obj) => obj.id === newObject.id);

  if (index !== -1) {
    // Update existing object
    existingList[index] = {...existingList[index], ...newObject};
  } else {
    // Add new object if ID doesn't exist
    existingList.push(newObject);
  }
  return existingList
}