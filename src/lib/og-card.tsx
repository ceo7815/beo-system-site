import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ogSize } from "@/lib/seo";
import { site } from "@/lib/site";

export async function shareCard() {
  const [logoData, latin] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/logo-mark.png")),
    readFile(join(process.cwd(), "src/app/fonts/rubik-latin-600.ttf")),
  ]);
  const logo = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#06040a",
          backgroundImage:
            "radial-gradient(circle at 50% 42%, rgba(88, 40, 160, 0.42) 0%, rgba(6, 4, 10, 0.96) 58%)",
          color: "#f3eef8",
          fontFamily: "Rubik",
        }}
      >
        <img
          src={logo}
          width={268}
          height={268}
          alt=""
          style={{
            borderRadius: 134,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 28,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {site.nameEn}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 22,
              color: "#9a90a8",
              letterSpacing: "0.16em",
            }}
          >
            Digital · AI · Dev
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 42,
            display: "flex",
            color: "#8b5cf6",
            fontSize: 22,
            letterSpacing: "0.08em",
          }}
        >
          {site.domain}
        </div>
      </div>
    ),
    {
      width: ogSize.width,
      height: ogSize.height,
      fonts: [{ name: "Rubik", data: latin, weight: 600, style: "normal" }],
    },
  );
}
