
export const JobInfoColumns = (jobData) => {
  const columns = [];

  for (const key of Object.keys(jobData)) {
    if (key === 'id') continue
    columns.push({
      field: key,
      headerName: key,
      type: "string",
      resizable: true,
      width: 200
    })
  }
  
  return columns
}