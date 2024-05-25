import SalesRepNavbar from "./_components/SaleRepNavbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SalesRepNavbar />
      {children}
    </>
  );
}
