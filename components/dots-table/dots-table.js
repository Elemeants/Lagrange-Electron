const Component = require('../component');
const EventEmitter = require('events');

function getInputValueu(id) {
    const input = $("#" + id)[0];
    const inputVal = input.value;
    input.value = "";
    return inputVal;
}

const tag = '#app-dots-table';
const templatePath = "/dots-table/dots-table.html";
module.exports = class DotsTable extends Component {
    constructor() {
        super(tag, templatePath);
        this.onPointsChange = new EventEmitter();
        this.onInterpolation = new EventEmitter();
        this.dots = [];
    }
    init() {
        const add_button = $('#btn-add-point')[0];
        add_button.addEventListener('click', () => { this.addPoint(); });

        const interpolate_button = $('#btn-interpolate-point')[0];
        interpolate_button.addEventListener('click', () => { this.interpolatePoint(); });
        
        const delete_button = $('#btn-delete-point')[0];
        delete_button.addEventListener('click', () => { this.removePoint(); });
    }
    interpolatePoint() {
        const inputX = $("#interpolar-value")[0];
        this.onInterpolation.emit('interpolate', inputX.value);
    }
    addPoint() {
        const dot = { x: +getInputValueu("input-x-value"), y: +getInputValueu("input-y-value")};
        const dotPointIndex = this.dots.findIndex(d => d.x == dot.x);
        if (dotPointIndex != -1) { this.dots.splice(dotPointIndex, 1); }
        this.dots.push(dot);
        this.onPointsChange.emit('add', dot);
        this.updateTable();
    }
    removePoint() {
        const dotX = getInputValueu("input-delete-value");
        const dotPointIndex = this.dots.findIndex(d => d.x == dotX);
        if (dotPointIndex != -1) { this.dots.splice(dotPointIndex, 1); }
        this.onPointsChange.emit('delete', dotX);
        this.updateTable();
    }
    updateTable() {
        const table = $('#table-rows')[0];
        table.innerHTML = "";
        this.dots.sort((a, b) => a.x - b.x).forEach((dot) => {
            console.log(dot);
            const template = `
            <tr>
                <td>${dot.x}</td>
                <td>${dot.y}</td>
            </tr>
            `;
            table.innerHTML += template;
        });
    }
    get interpolationResult() { return $('#interpolar-result')[0].value; }
    set interpolationResult (result) {
        $('#interpolar-result')[0].value = result;
    }
};