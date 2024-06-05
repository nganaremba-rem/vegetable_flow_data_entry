import { Card, CardHeader, CardTitle } from "./ui/card";

export default function AdminCard({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="min-h-36 flex hover:bg-slate-200 cursor-pointer select-none items-center justify-center bg-primary-base dark:bg-primary-baseDark">
      <CardHeader className="flex gap-2 items-center">
        {icon}
        <CardTitle className="text-gray-700 text-lg">{title}</CardTitle>
      </CardHeader>
    </Card>
  );
}
