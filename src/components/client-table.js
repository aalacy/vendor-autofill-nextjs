import { Table, Tbody, Tr, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export const ClientTable = ({ data, headers }) => {
  if (data.length < 1) return <></>
  return (
    <Table>
      {headers}
      <Tbody>
          <Tr >
            {
              <>
                {Object.keys(data).map((key) => (
                  <Td key={key}>{data[key]}</Td>
                ))}
              </>
            }
          </Tr>
      </Tbody>
    </Table>
  );
};
