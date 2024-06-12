import LogoImage from "@/app/icon.png";
import Image from "next/image";
import Link from "next/link";

export default function Logo({ size = 70 }: { size?: number }) {
  return (
    <>
      <Link href={"/"}>
        <div className="flex flex-col justify-center w-max">
          <div className="flex justify-center items-center">
            <Image
              width={size}
              height={size}
              quality={100}
              src={LogoImage}
              alt="Logo"
            />
          </div>
          <h6
            className="font-extrabold text-gray-500 dark:text-slate-200"
            style={{ fontSize: size / 6.5 }} // Adjust the divisor to fit your design
          >
            Vegetable Flow
          </h6>
        </div>
      </Link>
    </>
  );
}
