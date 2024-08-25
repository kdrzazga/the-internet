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
	
	async getCheckboxesCount(){
		let checkboxes = await this.page.$$("input[type='checkbox']");
		let cnt = checkboxes.length;
		console.log(`Found ${cnt} checkboxes.`);
		return cnt;
	}
	
	async getCheckboxText(index){
		if (this.#validateCheckboxIndex(index)){
			return;
		}
				
		let checkboxes = await this.page.$$("input[type='checkbox']");
		let chkbox = await checkboxes[index];
		
		const parentHandle = await chkbox.evaluateHandle(el => el.parentElement);
		const chkboxText = await this.page.evaluate(el => el.innerText, parentHandle);
		return chkboxText;
	}
	
	async clickCheckbox(index){		
		if (!this.#validateCheckboxIndex(index)){
			return;
		}
		
		let checkboxes = await this.page.$$("input[type='checkbox']");
		let chkbox = await checkboxes[index];
		
		await chkbox.click();
		const chkboxText = await this.getCheckboxText(index);
		console.log(`Clicked checkbox ${chkboxText}.`);
		return chkboxText;
	}
	
	async #validateCheckboxIndex(index){
		const chkboxCnt = await this.getCheckboxesCount();
		if (index >= chkboxCnt){
			console.error(`Wrong index. There are only ${chkboxCnt} checkboxes.`);
			return false;
		}
		
		return true;
	}

    async takeScreenshot(path) {
        await this.page.screenshot({ path, fullPage: false });
    }
}

module.exports = InternetPage;
