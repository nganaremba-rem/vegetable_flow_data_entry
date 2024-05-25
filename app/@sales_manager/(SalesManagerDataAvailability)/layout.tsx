import SalesManagerNavbar from "./_components/SalesManagerNavbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative">
        <SalesManagerNavbar />
        {children}
      </div>
    </>
  );
}
