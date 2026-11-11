import { NextResponse } from "next/server";
import { ADVISOR_PROFILE } from "@/data/club-data";

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&#(\d+);/g, (_, dec: string) => {
      const code = Number.parseInt(dec, 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : "";
    })
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => {
      const code = Number.parseInt(hex, 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : "";
    })
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function parseOverviewHtml(html: string): string[] {
  const paragraphs: string[] = [];
  const paragraphMatches = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi) ?? [];

  for (const rawParagraph of paragraphMatches) {
    const stripped = decodeHtmlEntities(rawParagraph.replace(/<[^>]+>/g, ""))
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (stripped.length > 0) {
      paragraphs.push(stripped);
    }
  }

  return paragraphs;
}

export async function GET() {
  try {
    const response = await fetch(ADVISOR_PROFILE.publicApiUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json({
        source: "verified-snapshot",
        syncedAt: new Date().toISOString(),
        profile: ADVISOR_PROFILE,
      });
    }

    let rawText = await response.text();
    if (rawText.startsWith(")]}'")) {
      const newlineIndex = rawText.indexOf("\n");
      rawText = newlineIndex >= 0 ? rawText.slice(newlineIndex + 1) : rawText;
    }

    const parsed = JSON.parse(rawText) as {
      name?: string;
      address?: { city?: string | null; country?: string | null };
      overview?: string;
      directory_resources?: Array<{
        url?: string;
        title?: string;
        description?: string;
      }>;
    };

    const city = parsed.address?.city ?? "Ho Chi Minh";
    const country = parsed.address?.country ?? "Vietnam";
    const parsedParagraphs =
      typeof parsed.overview === "string" ? parseOverviewHtml(parsed.overview) : [];
    const firstResource = parsed.directory_resources?.[0];

    return NextResponse.json({
      source: "google-live-api",
      syncedAt: new Date().toISOString(),
      profile: {
        ...ADVISOR_PROFILE,
        name: parsed.name || ADVISOR_PROFILE.name,
        location: `${city}, ${country}`,
        overviewParagraphs:
          parsedParagraphs.length > 0
            ? parsedParagraphs
            : ADVISOR_PROFILE.overviewParagraphs,
        featuredResource:
          firstResource?.title && firstResource?.description
            ? {
                title: firstResource.title,
                url: firstResource.url || ADVISOR_PROFILE.featuredResource.url,
                description: firstResource.description,
              }
            : ADVISOR_PROFILE.featuredResource,
      },
    });
  } catch {
    return NextResponse.json({
      source: "verified-snapshot",
      syncedAt: new Date().toISOString(),
      profile: ADVISOR_PROFILE,
    });
  }
}
