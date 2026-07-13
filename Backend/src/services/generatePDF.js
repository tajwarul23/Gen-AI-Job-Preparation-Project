import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const isProduction = process.env.NODE_ENV === "production";

let browserInstance = null;
let pdfsGeneratedSinceRestart = 0;
const MAX_PDFS_BEFORE_RESTART = 300;

const getBrowser = async () => {
  const canReuse =
    browserInstance &&
    browserInstance.isConnected() &&
    pdfsGeneratedSinceRestart < MAX_PDFS_BEFORE_RESTART;

  if (canReuse) return browserInstance;

  // Close old browser cleanly if it exists (e.g. restart threshold hit)
  if (browserInstance) {
    try {
      await browserInstance.close();
    } catch (err) {
      console.warn("Old browser failed to close cleanly:", err.message);
    }
  }

  browserInstance = await puppeteer.launch(
    isProduction
      ? {
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          headless: chromium.headless,
        }
      : {
          executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
          headless: true,
          args: ["--no-sandbox"],
        }
  );

  pdfsGeneratedSinceRestart = 0;

  browserInstance.on("disconnected", () => {
    console.warn("Browser disconnected — will relaunch on next request.");
    browserInstance = null;
  });

  return browserInstance;
};

// FIX 1 — Warm up a page and return it WITHOUT closing
// Called in parallel with Gemini so the page is ready when AI finishes
export const warmUpPage = async () => {
  const browser = await getBrowser();
  const page = await browser.newPage();
  // Set viewport early — one less thing to do later
  await page.setViewport({ width: 794, height: 1123 });
  return page; // caller is responsible for closing this page
};

// FIX 1 — Accepts an already-warm page instead of creating one internally
// FIX 2 — pdf() and screenshot() run in parallel via Promise.all
// FIX 5 — domcontentloaded instead of networkidle0
export const generatePDFFromPage = async (page, html) => {
  try {
    // FIX 5: domcontentloaded fires as soon as HTML/CSS is parsed.
    // Safe as long as your resume HTML has no external image URLs or <link> font imports.
    // If you have Google Fonts or remote images, embed them as base64 instead.
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    // FIX 2: Both operations work on the same already-rendered page.
    // No reason to wait for pdf() before starting screenshot() — run together.
    const [pdfBuffer, thumbnailBuffer] = await Promise.all([
      page.pdf({
        format: "A4",
        printBackground: true, // without this, CSS background colors are stripped in PDF
      }),
      page.screenshot({
        type: "jpeg",
        quality: 80,
        clip: { x: 0, y: 0, width: 794, height: 1123 }, // crop to exactly one A4 page
      }),
    ]);

    pdfsGeneratedSinceRestart += 1;
    return { pdfBuffer, thumbnailBuffer };
  } finally {
    // Always close the page (tab) — never the browser itself
    await page.close();
  }
};



export default generatePDF;