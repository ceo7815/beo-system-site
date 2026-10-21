import { LpView } from "@/components/lp/lp-view";
import { lpPageMetadata } from "@/lib/lp-meta";
import { lpPages } from "@/lib/lp";

const page = lpPages.automation;

export const metadata = lpPageMetadata(page);

export default function AutomationPage() {
  return <LpView page={page} />;
}
