import { Header } from "../components/sections/header";
import { Footer } from "../components/sections/footer";
import { Showcase } from "../components/sections/showcase";
import CanvasDots from "@/components/sections/canvasdots";

export default function Home() {
  return (
    <div>
      <main>
        {/* CANVAS */}
        <section>
          <CanvasDots />
        </section>
        {/* HEADER */}
        <section>
          <Header />
        </section>
        {/* GAME SHOWCASE */}
        <section className="max-w-[1200px] mx-auto">
          <Showcase />
        </section>
        {/* FOOTER */}
        <section>
          <Footer />
        </section>
      </main>
    </div>
  );
}
