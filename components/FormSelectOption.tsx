import { v4 } from "uuid";
import { SelectItem } from "./ui/select";

export default function FormSelectOption({
  options,
}: {
  options: { label: string; value: string }[];
}) {
  return (
    <>
      {options.map((option) => (
        <SelectItem key={v4()} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </>
  );
}
