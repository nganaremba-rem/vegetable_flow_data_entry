"use client";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-lg font-bold text-center p-2 text-red-600">
      {message || "Error fetching data"}
    </div>
  );
}
