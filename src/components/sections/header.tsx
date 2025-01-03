import { sour_gummy } from "../../app/ui/fonts/fonts";

export function Header() {
  return (
    <section>
      <div className="h-[50px] bg-indigo-900 items-center justify-center flex">
        <p className="text-white text-[1.20rem]"><a href="/" className="underline font-bold">NPC QUIZ</a> IS OUT!</p>
      </div>
      <div className="my-5">
        <h1 className={`${sour_gummy.className} text-center text-5xl`}>
          WASTEMYTIME.IO
        </h1>
        <p className="text-center text-2xl my-3">Hope you have a great day!</p>
      </div>
    </section>
  );
}
