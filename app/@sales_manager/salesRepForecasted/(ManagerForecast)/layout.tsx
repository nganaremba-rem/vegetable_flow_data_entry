import StickyNav from "./_components/StickyNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative">
        <StickyNav />
        {children}
      </div>
    </>
  );
}
