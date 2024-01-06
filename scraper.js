const puppeteer = require("puppeteer");

(async () => {
  // Otwórz przeglądarkę
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });

  // Otwórz nową stronę
  const page = await browser.newPage();

  // Przejdź do konkretnej strony
  await page.goto(
    "https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy/tabliczka/46/768/p/87-dunska"
  );

  const table = await page.$$(
    ".accordion-item > div >>> table > tbody > tr > td > a > .visually-hidden"
  );
  /*  let hours = [];
  let minutes = [];

  for (const field of table) {
    const hour = await page.evaluate((el) => {
      const text = el.querySelector(
        "div>div>div>div>div>table>thead>tr"
      ).textContent;
      return text.trim().replace(/\s+/g, " ");
    }, field);
    const minute = await page.evaluate((el) => {
      const text = el.querySelector(
        "div>div>div>div>div>table>tbody>tr"
      ).textContent;
      return text.trim().replace(/\s+/g, " ");
    }, field);
    hours.push(hour);
    minutes.push(minute);
  }
  console.log(minutes); */
  let departureTimes = [];
  for (const field of table) {
    const departureTime = await page.evaluate((el) => {
      return el.textContent.replace(/\s+/g, " ");
    }, field);
    departureTimes.push(departureTime);
  }
  console.log(departureTimes);
  await browser.close();
})();
