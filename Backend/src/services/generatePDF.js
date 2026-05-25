import puppeteer from "puppeteer";

const generatePDF = async (html) => {
  let browser;
  try {
     browser = await puppeteer.launch({
      headless: true,
       
      ignoreDefaultArgs: ["--disable-extensions"],
      args: [
        "--no-sandbox",
        "--use-gl=egl",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    );
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

    return { pdfBuffer, thumbnailBuffer };
  } catch (error) {
    console.log("Could not create a browser instance =>", error);
   res.send("Something went wrong while generating the resume pdf..!")
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export default generatePDF;
