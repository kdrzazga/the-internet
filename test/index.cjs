const express = require('express');
const { chromium } = require('playwright');
const { wait } = require('./lib.cjs');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
let browser;

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Tests</title>
        </head>
        <body>
            <p><a href='http://localhost:8080/'>Open website</a></p>
            <p><a href='http://localhost:3000/the-internet-add-remove'>Add/Remove button tests</a></p>
        </body>
        </html>
    `);
});

app.get('/the-internet-add-remove', async (req, res) => {
    browser = await chromium.launch({ headless: false, slowMo: 100 });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:8080');
    const title = await page.title();

    const addButton = await page.locator('text="Add button"');
    const addButtonText = await addButton.innerText();
	console.log('Fetched inner text from the button: ' + addButtonText);
	
	for (let i = 0; i <7; i++){
		addButton.click();
	}
	
	await page.screenshot({
        path: 'screenshots/the-internet.AddButton.png',
        fullPage: true
    });
	
    await wait(3500);
    await browser.close();
    res.send(`Title: ${title}, Add Button Text: ${addButtonText}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});