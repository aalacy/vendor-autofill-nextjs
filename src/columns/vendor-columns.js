import { Switch } from "@mui/material"

export const VendorsColumns = () => {
    return [
      {
        field: "name",
        headerName: "Name",
        type: "string",
        resizable: true,
        width: 200
      },
      
      {
        field: "email",
        headerName: "Email",
        type: "string",
        resizable: true,
        width: 200
      },
      {
        field: "credit_auth",
        headerName: "Credit Auth",
        resizable: true,
        renderCell: (params) => (<Switch defaultChecked />)
      },
      {
        field: "rental_agreement",
        headerName: "Rental Agreement",
        resizable: true,
        renderCell: (params) => (<Switch defaultChecked />)
      },
    ]
}