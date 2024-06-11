import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { VendorList } from "src/components/home/vendor-list";
import { HeaderForm } from "src/components/home/header-form";
import { useAuth } from "src/hooks/use-auth";
import { VendorService } from "src/services";

export const HomeMain = () => {

  const { user, showJobForm, project } = useAuth();

  useEffect(() => {
    if (user?.has_job_submitted) return;
    showJobForm(true);
  }, [user, showJobForm]);

  const { isLoading, data: vendors } = useQuery({
    queryKey: ["getAllVendors", project.id],
    queryFn: async () => {
      const {
        data: { result },
      } = await VendorService.all(project?.id);
      return result.items;
    },
  });

  return (
    <>
      <HeaderForm
        vendors={vendors}
      />
      <VendorList
        vendors={vendors}
        isLoading={isLoading}
      />
    </>
  );
};
