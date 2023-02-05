
const puppeteer = require("puppeteer");

async function start() {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_EXEC_PATH,
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/");
  await page.setViewport({ width: 1116, height: 942 });
  await page.waitForTimeout(50000);

  await page.waitForSelector("body > #root > div > button:nth-child(1)");
  await page.click("body > #root > div > button:nth-child(1)");
 
  await page.waitForTimeout(3000);
  await page.mouse.move(500, 300); // first move the mouse on the map

  await page.mouse.down();
  //webGL camera needs different position
  //await page.mouse.move(358, 390);
  await page.mouse.up();
  await page.waitForTimeout(50);

// zoom slowly in

await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(100);
await page.mouse.wheel({ deltaY:  -1000 });
await page.waitForTimeout(100);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(500);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -20000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -4000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -4000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -4000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -4000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -4000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -4000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(2000);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -4000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -4000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -4000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(50);
await page.mouse.wheel({ deltaY:  -2000 });
await page.waitForTimeout(4000);
//start pan test

   await page.mouse.down();
   await page.mouse.move(200, 400);
   await page.mouse.up();
   await page.waitForTimeout(50);

   await page.mouse.down();
   await page.mouse.move(200, 200);
   await page.mouse.up();
   await page.waitForTimeout(50);

   await page.mouse.down();
   await page.mouse.move(300, 200);
   await page.mouse.up();
   await page.waitForTimeout(50);

   await page.mouse.down();
   await page.mouse.move(200, 300);
   await page.mouse.up();
   await page.waitForTimeout(50);

   await page.mouse.down();
   await page.mouse.move(200, 800);
   await page.mouse.up();
   await page.waitForTimeout(50);

   await page.mouse.down();
   await page.mouse.move(700, 200);
   await page.mouse.up();
   await page.waitForTimeout(50);

   await page.mouse.down();
   await page.mouse.move(200, 300);
   await page.mouse.up();
   await page.waitForTimeout(50);

   await page.waitForTimeout(2000);

  await browser.close();
}
start();
