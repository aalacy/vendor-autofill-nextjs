import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

import { ClientDataGrid } from "../client-datagrid";
import { JobInfoColumns, TrackingColumns, VendorsColumns } from "src/columns";
import { VendorService } from "src/services";
import { ClientTable } from "../client-table";

export const TrackingInfo = ({ data, setData }) => {
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await VendorService.readGSheet();
      setData(data.result);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
     
      <ClientDataGrid loading={loading} data={data || []} columns={TrackingColumns()} />
    </div>
  );
};
