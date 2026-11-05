import Link from "next/link";
import { STORE } from "@/lib/store-config";

export function AnnouncementBar() {
  return (
    <div className="on-dark bg-night text-paper">
      <p className="label mx-auto max-w-6xl px-5 py-2.5 text-center text-[10px] text-paper/80 md:text-[11px]">
        {STORE.announcement}{" "}
        <Link href="/encuentra-tu-aroma" className="link-u ml-1 text-paper">
          Hacer el test
        </Link>
      </p>
    </div>
  );
}
