import ProcurementNavbar from "./_components/ProcurementNavbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProcurementNavbar />
      {children}
    </>
  );
}
