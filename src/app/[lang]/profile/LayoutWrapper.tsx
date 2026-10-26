'use client'

import { siteConfig } from "@/config/config";
import { useAppSelector } from "@/store/store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = useAppSelector((state) => state.user.userData);

  //console.log(user,"userhala")
  // if (!user?.id || user?.id===2820) {
  //   return null; // hide page until user loads
  // }

  return <>{children}</>;
}
