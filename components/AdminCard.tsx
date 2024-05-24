import { Card, CardHeader, CardTitle } from "./ui/card";

export default function AdminCard({ title }: { title: string }) {
  return (
    <Card className="min-h-36 flex hover:bg-slate-200 cursor-pointer select-none items-center justify-center bg-primary-base dark:bg-primary-baseDark">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  );
}
