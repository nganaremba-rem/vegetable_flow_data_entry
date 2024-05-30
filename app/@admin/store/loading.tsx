import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="p-36 flex justify-center items-center">
      <ClipLoader color="#0173DC" size={30} />
    </div>
  );
}
