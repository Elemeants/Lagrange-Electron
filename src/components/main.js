window.$ = window.jQuery = require('jquery');
window.Bootstrap = require('bootstrap');
const LagrangeComponent = require('./lagrange-chart/lagrange-chart');
const TableComponents = require('./dots-table/dots-table');
const LagrangeUtil = require('./lagrange');
const HeaderNav = require('./header-nav/header-nav');

const lgr = new LagrangeComponent();
const table = new TableComponents();
const lagrange = new LagrangeUtil();
const headerNav = new HeaderNav();

function renderComponents() {
    headerNav.render();
    lgr.render();
    table.render();
}

function updateLagrangeChart() {
    lgr.clearPoints();
    if (lagrange.points.length >= 2) {
        for (let index = lagrange.getMinValue(); index <= lagrange.getMaxValue();
            index = Math.round((index + 0.005) * 1000) / 1000) {
            const yval = lagrange.Interpolate(index);
            lgr.addPoint(index, yval);
        }
    }
    lgr.update();
}

function addEventLiseners() {
    table.onPointsChange.on('add', (dot) => {
        lagrange.addPoint(dot.x, dot.y);
        updateLagrangeChart();
    });
    
    table.onPointsChange.on('delete', (dotX) => {
        lagrange.removePoint(dotX);
        updateLagrangeChart();
    });
    
    table.onInterpolation.on('interpolate', (dotX) => {
        table.interpolationResult = lagrange.Interpolate(dotX);
    });
}

renderComponents();
addEventLiseners();