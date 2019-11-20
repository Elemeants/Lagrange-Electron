const { Chart } = require('chart.js')
const Component = require('../component');

const tag = '#app-lagrange-chart';
const templatePath = "/lagrange-chart/lagrange-chart.html";

module.exports = class LagrangeChart extends Component {
    constructor() { super(tag, templatePath); }
    init() {
        var ctx = $('#lagrange-chart')[0].getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'F(x)',
                    data: [],
                    borderWidth: 1,
                    fill: false,
                    lineTension: 0,
                    borderColor: 'rgba(0, 0, 0, 0.6)',
                    pointBorderWidth: 0,
                    pointRadius: 1,
                    pointStyle: 'line'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        type: 'linear',
                        ticks: {
                            stepSize: 0.1,
                        }
                    }],
                    xAxes: [{
                        type: 'linear',
                        ticks: {
                            stepSize: 0.1,
                        }
                    }]
                },
                legend: { display: false },
                maintainAspectRatio: false,
                animation: false,
                responsive: true,
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            const xVal = Math.round(tooltipItem.xLabel * 1000) / 1000;
                            const yVal = Math.round(tooltipItem.yLabel * 1000) / 1000;
                            var label = 'F(' + xVal + ') = ' + yVal;
                            return label;
                        }
                    }
                }
            }
        });
    }

    get DataPoints() {
        return this.chart.data.datasets[0].data;
    }
    set DataPoints(val) {
        this.chart.data.datasets[0].data = val;
    }

    addPoint(valX, valY) {
        const points = this.DataPoints;
        if (points) { points.push({x: valX, y: valY}); }
    }

    update() {
        this.chart.update();
    }

    clearPoints() {
        this.DataPoints = [];
    }
}