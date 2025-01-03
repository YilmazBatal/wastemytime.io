import { sour_gummy } from "@/app/ui/fonts/fonts";
import { Coffee, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <section className="max-w-[1200px] mx-auto">
      <hr className="my-5 h-[2px] bg-indigo-800" />
      {/* <div className="flex grid grid-cols-12 items-center justify-center mx-5">
        <a href="/" className={`${sour_gummy.className} btn flex col-span-6 sm:col-span-4 m-auto my-2`}>
          Subscribe <div className="mx-1" /> <Mail />
        </a>
        <a href="/" className={`${sour_gummy.className} btn flex col-span-6 sm:col-span-4 m-auto my-2`}>
          Follow <div className="mx-1" /> <Twitter />
        </a>
        <a href="/" className={`${sour_gummy.className} btn flex col-span-6 sm:col-span-4 m-auto my-2`}>
          Treat me <div className="mx-1" /> <Coffee />
        </a>
      </div> */}
      <div className="mx-5 flex flex-wrap justify-center">
        <a href="/" className={`${sour_gummy.className} btn flex my-2 mx-3`}>
          Subscribe <div className="mx-1" /> <Mail />
        </a>
        <a href="/" className={`${sour_gummy.className} btn flex my-2 mx-3`}>
          Follow <div className="mx-1" /> <Twitter />
        </a>
        <a href="/" className={`${sour_gummy.className} btn flex my-2 mx-3`}>
          Treat me <div className="mx-1" /> <Coffee />
        </a>
      </div>
      <p className={`m-3 text-center text-zinc-600`}>
        <span className={`${sour_gummy.className} text-zinc-600`}>
          WASTEMYTIME.COM
        </span>
        {" "}- All rights reserved - 2025
      </p>
      <div className="flex justify-center my-5">
        <a href="/" className="text-indigo-800 zoom mx-2 underline">
          Privacy Policy
        </a>
      </div>
    </section>
  );
}
