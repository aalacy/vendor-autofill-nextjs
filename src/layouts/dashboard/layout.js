import { withAuthGuard } from "src/hocs/with-auth-guard";
import { BasicLayout } from "../basic/basic-layout";

export const Layout = withAuthGuard(({ children }) => {
  return (
    <>
      <BasicLayout>{children}</BasicLayout>
    </>
  );
});
