const express = require('express');
const { wait } = require('./lib.cjs');
const InternetPage = require('./InternetPage.cjs');
const { chromium } = require('playwright');

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
            <p><a href='http://localhost:3000/checkboxes'>Checkboxes tests</a></p>
            <p><a href='http://localhost:3000/radios'>Radio buttons tests</a></p>
        </body>
        </html>
    `);
});


app.get('/the-internet-add-remove', async (req, res) => {
    const browser = await chromium.launch({ headless: false, slowMo: 100 });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const internetPage = new InternetPage(page, 'http://localhost:8080');
    
    await internetPage.navigate();
    const title = await internetPage.getTitle();
    
    const addButtonText = await internetPage.getAddButtonText();
    console.log('Fetched inner text from the button: ' + addButtonText);
    
    await internetPage.clickAddButton(7);

    await internetPage.takeScreenshot('screenshots/the-internet.AddButton.png');
    
    let removeMeButtonCount = await internetPage.getRemoveMeButtonCount();
    console.log('"Remove Me" buttons that appeared: ' + removeMeButtonCount);
    
    await internetPage.clickRemoveMeButtons();
    
    removeMeButtonCount = await internetPage.getRemoveMeButtonCount();
    console.log('Now the number of "Remove Me" buttons is: ' + removeMeButtonCount);
    
    await new Promise(resolve => setTimeout(resolve, 3500));
    await browser.close();
    
    res.send(`Title: ${title}, Add Button Text: ${addButtonText}, "Remove Me" buttons that appeared: ${removeMeButtonCount}`);
});

app.get('/checkboxes', async (req, res) => {
    const browser = await chromium.launch({ headless: false, slowMo: 100 });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const internetPage = new InternetPage(page, 'http://localhost:8080');
    
    await internetPage.navigate();
	await new Promise(resolve => setTimeout(resolve, 1500));
	const checkboxesCount = await internetPage.getCheckboxesCount();
	await internetPage.takeScreenshot('screenshots/the-internet.checkbox.before.png');
	await internetPage.clickCheckbox(1);
	await internetPage.takeScreenshot('screenshots/the-internet.checkbox.after.png');
	
	let statuses = await internetPage.getCheckboxStatuses();
	
    await new Promise(resolve => setTimeout(resolve, 3500));
    await browser.close();
    
    res.send(`checkboxes: ${checkboxesCount}<br/>Checkboxes: ${statuses}`);
});

app.get('/radios', async (req, res) => {
    const browser = await chromium.launch({ headless: false, slowMo: 100 });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const internetPage = new InternetPage(page, 'http://localhost:8080');
    
    await internetPage.navigate();
	
	const colors = ['white', 'blue', 'red'];

	for (const color of colors) {
		await internetPage.clickRadioButton(color);
		await internetPage.takeScreenshot(`screenshots/the-internet.radio.${color}.png`);
	}
	
	let statuses = await internetPage.getRadioButtonsStatuses();
	
    await new Promise(resolve => setTimeout(resolve, 3500));
    await browser.close();
    
    res.send(`Status of Radio buttons: ${statuses}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});