// InternetPage.js
const { expect } = require('@playwright/test');

class InternetPage {
    constructor(page, url) {
        this.page = page;
		this.url = url;
        this.addButton =  this.page.locator('text="Add button"');
        this.removeMeButtons = this.page.locator('text="Remove me"');
		this.radioButtonsSelector = "label > input[type='radio']";
		this.checkboxesSelector = "input[type='checkbox']";
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
	
	async clickRadioButton(value) {
		let radioButtons = await this.page.$$(this.radioButtonsSelector);

		for (let radioButton of radioButtons) {
			const radioValue = await radioButton.evaluate(el => el.value);
			if (radioValue === value) {
				await radioButton.click();
			}
		} 
	}
		
	async getRadioButtonsStatuses(){
		let radios = await this.page.$$(this.radioButtonsSelector);
		let statuses = [];
		
		for (var i = 0; i < radios.length; i++){
			let s = await radios[i].isChecked();
			statuses.push(s);
		}
		
		return statuses;
	}
	
	async getCheckboxesCount(){
		let checkboxes = await this.page.$$(this.checkboxesSelector);
		let cnt = checkboxes.length;
		console.log(`Found ${cnt} checkboxes.`);
		return cnt;
	}
		
	async clickCheckbox(index){		
		if (!this.#validateCheckboxIndex(index)){
			return;
		}
		
		let checkboxes = await this.page.$$(this.checkboxesSelector);
		let chkbox = await checkboxes[index];
		
		await chkbox.click();
		console.log(`Clicked checkbox ${index}.`);
	}
	
	async getCheckboxStatuses(){
		let checkboxes = await this.page.$$(this.checkboxesSelector);
		let statuses = [];
		
		for (var i = 0; i < checkboxes.length; i++){
			let s = await checkboxes[i].isChecked();
			statuses.push(s);
		}
		
		return statuses;
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
