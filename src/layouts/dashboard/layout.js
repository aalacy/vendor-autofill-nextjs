import { withAuthGuard } from "src/hocs/with-auth-guard";
import { BasicLayout } from "../basic/basic-layout";
import { JobFormModal } from "src/components/job-form/job-form-modal";

export const Layout = withAuthGuard(({ children }) => {
  return (
    <>
    <BasicLayout>
      {children}
    </BasicLayout>
    </>
  )
});
