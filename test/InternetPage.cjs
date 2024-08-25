// InternetPage.js
const { expect } = require('@playwright/test');

class InternetPage {
    constructor(page, url) {
        this.page = page;
		this.url = url;
        this.addButton = this.page.locator('text="Add button"');
        this.removeMeButtons = this.page.locator('text="Remove me"');
    }

    async navigate() {
        await this.page.goto(this.url);
    }

    async getTitle() {
        return await this.page.title();
    }

    async getAddButtonText() {
        return await this.addButton.innerText();
    }

    async clickAddButton(count) {
        for (let i = 0; i < count; i++) {
            await this.addButton.click();
        }
    }

    async getRemoveMeButtonCount() {
        return await this.removeMeButtons.count();
    }

    async clickRemoveMeButtons() {
        const count = await this.getRemoveMeButtonCount();
        for (let i = count - 1; i >= 0; i--) {
            await this.removeMeButtons.nth(i).click();
        }
    }

    async takeScreenshot(path) {
        await this.page.screenshot({ path, fullPage: false });
    }
}

module.exports = InternetPage;
