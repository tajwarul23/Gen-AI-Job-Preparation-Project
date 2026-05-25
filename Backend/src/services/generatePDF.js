import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const generatePDF = async (html) => {
  let browser;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    
    await page.setViewport({ width: 794, height: 1123 });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    const thumbnailBuffer = await page.screenshot({
      type: "jpeg",
      quality: 80,
      clip: { x: 0, y: 0, width: 794, height: 1123 },
    });

    return { pdfBuffer, thumbnailBuffer };

  } catch (error) {
    console.error("Could not create browser instance:", error);
    throw error;
  } finally {
    if (browser) await browser.close();
  }
};

export default generatePDF;