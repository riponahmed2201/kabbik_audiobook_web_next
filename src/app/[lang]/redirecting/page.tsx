import { RedirectComponent } from "@/features/layoutShell";
import { auth } from "../../lib/auth";

const GoogleRedirect = async ({
  searchParams,
}: {
  searchParams: Promise<{ route?: string }>;
}) => {
  const session = await auth();
  const sp = await searchParams;
  const redirectRoute: string = sp.route ?? "";
  return (
    <>
      <RedirectComponent session={session} redirectRoute={redirectRoute} />
    </>
  );
};

export default GoogleRedirect;
