import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

import { ClientDataGrid } from "../tables/client-datagrid";
import { TrackingColumns } from "src/columns";
import { VendorService } from "src/services";

export const TrackingInfo = ({ data, setData }) => {
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await VendorService.readGSheet();
      setData(data.result);
    } catch (err) {
      toast.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [setData]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <ClientDataGrid loading={loading}
data={data || []}
columns={TrackingColumns()} />
    </div>
  );
};
