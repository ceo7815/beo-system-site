import { LpView } from "@/components/lp/lp-view";
import { lpPageMetadata } from "@/lib/lp-meta";
import { lpPages } from "@/lib/lp";

const page = lpPages.agent;

export const metadata = lpPageMetadata(page);

export default function AiAgentPage() {
  return <LpView page={page} />;
}
