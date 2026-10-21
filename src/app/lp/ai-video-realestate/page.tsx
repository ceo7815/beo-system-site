import { LpView } from "@/components/lp/lp-view";
import { lpPageMetadata } from "@/lib/lp-meta";
import { lpPages } from "@/lib/lp";

const page = lpPages.realEstate;

export const metadata = lpPageMetadata(page);

export default function AiVideoRealEstatePage() {
  return <LpView page={page} />;
}
