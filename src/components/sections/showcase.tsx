"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

export function Showcase() {
  // const router = useRouter();
  // const handleClick = (url: string) => {
  //   router.push(url);
  // };

  return (
    <div className="grid grid-cols-12 gap-4 items-center justify-center my-5 mx-5">
      <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-4 flex justify-center items-center">
        <Link href="/npc-quiz">
          <Image
            src="/covers/npc.jpg"
            layout="responsive"
            alt="NPC Quiz"
            width={1}
            height={1}
            className="zoom showcase-image link"
          />
        </Link>
      </div>
      <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-4 flex justify-center items-center">
        <Link href="/npc-quiz">
          <Image
            src="/covers/npc.jpg"
            layout="responsive"
            alt="NPC Quiz"
            width={1}
            height={1}
            className="zoom showcase-image link"
          />
        </Link>
      </div>
      <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-4 flex justify-center items-center">
        <Link href="/npc-quiz">
          <Image
            src="/covers/npc.jpg"
            layout="responsive"
            alt="NPC Quiz"
            width={1}
            height={1}
            className="zoom showcase-image link"
          />
        </Link>
      </div>
      <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-4 flex justify-center items-center">
        <Link href="/npc-quiz">
          <Image
            src="/covers/npc.jpg"
            layout="responsive"
            alt="NPC Quiz"
            width={1}
            height={1}
            className="zoom showcase-image link"
          />
        </Link>
      </div>
      <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-4 flex justify-center items-center">
        <Link href="/npc-quiz">
          <Image
            src="/covers/npc.jpg"
            layout="responsive"
            alt="NPC Quiz"
            width={1}
            height={1}
            className="zoom showcase-image link"
          />
        </Link>
      </div>
    </div>
  );
}
