import { Switch } from "@mui/material"
import { useGridApiContext} from "@mui/x-data-grid-pro"

const EditSwitchCell = (params) => {
  const { id, value, row, field, handleCellValueChange } = params;
  const apiRef = useGridApiContext();

  return (
    <Switch
      key={id}
      defaultValue={value}
      onChange={(event) =>
        {
          const props = { id: row.id, field, value: event.target.checked };
          handleCellValueChange && handleCellValueChange(props)
          apiRef.current.setEditCellValue({...props, debounceMs: 200})
        }
      }
    />
  );
}

export const VendorsColumns = ({ handleCellValueChange }) => {
    return [
      {
        field: "name",
        headerName: "Name",
        type: "string",
        resizable: true,
        width: 200
      },
      
      // {
      //   field: "email",
      //   headerName: "Email",
      //   type: "string",
      //   resizable: true,
      //   width: 200
      // },
      {
        field: "credit_auth",
        headerName: "Credit Auth",
        resizable: true,
        renderCell: (params) => <EditSwitchCell  {...params}  field="credit_auth" handleCellValueChange={handleCellValueChange}/>
      },
      {
        field: "rental_agreement",
        headerName: "Rental Agreement",
        resizable: true,
        width: 300,
        renderCell: (params) => <EditSwitchCell  {...params} field="rental_agreement" handleCellValueChange={handleCellValueChange}/>
      },
    ]
}