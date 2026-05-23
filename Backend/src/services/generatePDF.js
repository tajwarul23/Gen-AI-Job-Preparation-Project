import puppeteer from "puppeteer";

const generatePDF = async (html) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  //generate pdf 
  const pdfBuffer = await page.pdf({
    format: "A4",

    printBackground: true,
  });

  //generate thumbnail - screenshot of first page
  await page.setViewport({ width: 794, height: 1123 });
  const thumbnailBuffer = await page.screenshot({
    type: "jpeg",
    quality: 80,
    clip: { x: 0, y: 0, width: 794, height: 1123 },
  });

  await browser.close();

  return {pdfBuffer, thumbnailBuffer};
};

export default generatePDF;
