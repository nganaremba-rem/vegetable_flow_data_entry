import { Button } from "./ui/button";

// add props that can take all html button props
export default function IncreaseButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <Button
      {...props}
      className="bg-green-600 w-7 h-7 text-white hover:bg-green-700"
    >
      +
    </Button>
  );
}
