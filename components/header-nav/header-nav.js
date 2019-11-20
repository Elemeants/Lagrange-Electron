const Component = require('../component');
const EventEmitter = require('events');
const electron = require('electron');

const tag = '#app-header-nav';
const templatePath = "/header-nav/header-nav.html";
module.exports = class HeaderNav extends Component {
    constructor() {
        super(tag, templatePath);
    }
    init() {
        $('#btn-navbar-close')[0].addEventListener("click", () => {
            const remote = electron.remote;
            let w = remote.getCurrentWindow();
            w.close();
        });
    }
}