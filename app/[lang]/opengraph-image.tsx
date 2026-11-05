import { ImageResponse } from "next/og";
import { getDictionary } from "@/lib/get-dictionary";
import { hasLocale } from "@/lib/i18n";

export const alt = "Reevue";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(hasLocale(lang) ? lang : "pt-br");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a3f8c",
          color: "white",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 48, fontWeight: 700 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="white" />
            <path
              d="M8 22.5 12.4 15.4 16.2 19.2 20.6 12.8 24.2 22.5"
              fill="none"
              stroke="#0a3f8c"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Reevue
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{dict.hero.title}</div>
        <div style={{ display: "flex", fontSize: 32, color: "#cfe0f7" }}>{dict.meta.title.replace("Reevue | ", "")}</div>
      </div>
    ),
    size,
  );
}
