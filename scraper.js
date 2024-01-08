const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();

  await page.goto(
    "https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy/tabliczka/46/768/p/87-dunska"
  );

  let total = [];
  const hours = await page.evaluate(() => {
    const accordionItems = document.querySelectorAll(".accordion-item");

    return Array.from(accordionItems).map((accordionItem) => {
      const hoursElements = accordionItem.querySelectorAll(
        "div >div> div> div> table > tbody > tr > td > a > .visually-hidden"
      );
      return Array.from(hoursElements).map((hour) =>
        hour.textContent.replace(/\s+/g, " ")
      );
    });
  });

  const days = await page.$$eval(
    ".accordion-header > button > div > div",
    (daysElements) => daysElements.map((day) => day.textContent.trim())
  );

  for (let i = 0; i < days.length; i++) {
    total.push(days[i]);
    total.push(hours[i]);
  }

  const isWeekday = () => {
    const now = new Date();
    if (now.getDay() < 6 && now.getDay() > 0) return true;
  };
  const isSaturday = () => {
    const now = new Date();
    if (now.getDay() === 6) return true;
  };
  const isSunday = () => {
    const now = new Date();
    if (now.getDay() === 0) return true;
  };

  const nearestDeparture = (departureTimes) => {
    // TO DO
  };

  if (isWeekday) {
    const nearest = nearestDeparture(total[1]);
    console.log(`Najbliższy odjazd w dni robocze: ${nearest}`);
  } else if (isSaturday) {
    const nearest = nearestDeparture(total[3]);
    console.log(`Najbliższy odjazd w sobotę: ${nearest}`);
  } else if (isSunday) {
    const nearest = nearestDeparture(total[5]);
    console.log(`Najbliższy odjazd w niedzielę: ${nearest}`);
  }

  //console.log(getTimeInMinutes(total[1][0]));

  await browser.close();
})();
