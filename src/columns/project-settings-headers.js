import { Thead, Tr, Th } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export const ProjectSettingsHeaders = ({ data }) => {
  if (!data) return <></>;

  return (
    <Thead>
      <Tr>
        {Object.keys(data).map((key) => (
          <Th key={key}>{key}</Th>
        ))}
      </Tr>
    </Thead>
  );
};
