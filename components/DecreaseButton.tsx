import { Button } from "./ui/button";

// add props that can take all html button props
export default function DecreaseButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <Button
      {...props}
      className="bg-red-600 w-7 h-7 text-white hover:bg-red-700"
    >
      -
    </Button>
  );
}
