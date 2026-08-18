import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ogSize } from "@/lib/seo";

export async function shareCard() {
  const logoData = await readFile(join(process.cwd(), "public/brand/logo-lockup.png"));
  const logo = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#858585",
        }}
      >
        <img src={logo} width={574} height={574} alt="" />
      </div>
    ),
    {
      width: ogSize.width,
      height: ogSize.height,
    },
  );
}
