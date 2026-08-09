import { ImageResponse } from "next/og";

import { identity, tagline } from "@/lib/content";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0e0e13",
        color: "#f5f5f2",
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 28,
          color: "#818cf8",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            backgroundColor: "#4f46e5",
            display: "flex",
          }}
        />
        {identity.title}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, fontWeight: 700, display: "flex" }}>{identity.name}</div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#a3a3ae",
            maxWidth: 900,
            display: "flex",
          }}
        >
          {tagline}
        </div>
      </div>

      <div style={{ display: "flex", fontSize: 24, color: "#a3a3ae" }}>{identity.location}</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
