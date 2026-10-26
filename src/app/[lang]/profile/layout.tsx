import AuthGuard from "./LayoutWrapper";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    //console.log("userhala")
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}
