const fs = require('fs');

module.exports = class Component {
    constructor( tag, templatePath ) {
        this.templatePath = templatePath;
        this.componentTag = tag;
    }
    render() {
        fs.readFile(__dirname + this.templatePath, (err, template) => {
            if (err) throw err;
            const template_string = template.toString('utf-8');
            const html = $.parseHTML(template_string);
            $(this.componentTag).append(html);
            this.init();
        });
    }
    init() { console.log("Empty component"); }
};