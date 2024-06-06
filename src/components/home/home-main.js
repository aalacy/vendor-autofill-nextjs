import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { VendorList } from "src/components/home/vendor-list";
import { HeaderForm } from "src/components/home/header-form";
import { useAuth } from "src/hooks/use-auth";
import { VendorService } from "src/services";

export const HomeMain = () => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const { user, showJobForm } = useAuth();

  useEffect(() => {
    if (user?.has_job_submitted) return;
    showJobForm(true);
  }, [user, showJobForm]);

  const { isLoading, data: vendors } = useQuery({
    queryKey: ["getAllVendors"],
    queryFn: async () => {
      const {
        data: { result },
      } = await VendorService.all();
      return result.items;
    },
  });

  return (
    <>
      <HeaderForm
        rowSelectionModel={rowSelectionModel}
        setRowSelectionModel={setRowSelectionModel}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        vendors={vendors}
      />
      <VendorList
        rowSelectionModel={rowSelectionModel}
        setRowSelectionModel={setRowSelectionModel}
        vendors={vendors}
        isLoading={isLoading}
      />
    </>
  );
};
