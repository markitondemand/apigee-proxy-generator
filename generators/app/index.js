const Generator = require('yeoman-generator');
const fs = require('fs');
const path = require('path');
const validators = require('./validators.js');

module.exports = class extends Generator {
	async userPrompts() {
		this.answers = await this.prompt([
			{
				type: 'input',
				name: 'name',
				message: "What is your proxy's name?",
				default: 'api-proxy',
				validate: validators.name
			},
			{
				type: 'input',
				name: 'description',
				message: 'Give us a quick description of your proxy'
			},
			{
				type: 'input',
				name: 'version',
				message: "What is your proxy's version?",
				default: 'v1',
				validate: validators.version
			}
		]);
	}

	install() {
		this.npmInstall();
	}

	writing() {
		this._copyTemplateFiles();
	}

	/**
	 * Recursively copy all files in /templates to their corresponding
	 * destination location
	 * @param {string} [dirRoot] - Optional root path to start copying. Defaults to the templates folder.
	 */
	_copyTemplateFiles(dirRoot) {
		// If no root path, start at the Yeoman generator's default templates folder
		if (!dirRoot) {
			dirRoot = this.sourceRoot();
		}
		// Grab list of all items (=== file names) in directory, including folders
		const items = fs.readdirSync(dirRoot);

		items.forEach(item => {
			// Resolve absolute path of item
			const itemPath = path.join(dirRoot, item);
			const stat = fs.statSync(itemPath);
			const templateVars = {
				name: this.answers.name,
				description: this.answers.description,
				version: this.answers.version
			};

			// Copy if file
			if (stat.isFile()) {
				// Get the relative location of the item to the root templates folder
				// so that we can emulate that folder structure in the destination folder
				const relItemPath = path.relative(this.sourceRoot(), itemPath);

				// check if file is packagejson.txt
				if (path.basename(itemPath) === 'gitignore.txt') {
					this.fs.copyTpl(itemPath, this.destinationPath('.gitignore'));
				} else if (path.basename(itemPath) === 'packagejson.txt') {
					this.fs.copyTpl(itemPath, this.destinationPath('package.json'), templateVars);
				} else if (path.basename(itemPath) === 'proxy-name.xml') {
					this.fs.copyTpl(
						itemPath,
						this.destinationPath(`${path.dirname(relItemPath)}/${this.answers.name}.xml`),
						templateVars
					);
				} else {
					// copy file without renaming
					this.fs.copyTpl(itemPath, this.destinationPath(relItemPath), templateVars);
				}
				// Recurse if directory
			} else {
				this._copyTemplateFiles(path.join(dirRoot, item));
			}
		});
	}
};
