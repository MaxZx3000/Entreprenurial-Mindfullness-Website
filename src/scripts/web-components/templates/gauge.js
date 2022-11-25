import "./jquery-gauge.min.js"

class GaugeElement extends HTMLElement{
    constructor(){
        super();
        this.gaugeElement = document.createElement("div");
        this.cpuGauge = null;
    }
    intiializeValues(value, maxValue){
        this.value = value;
        this.maxValue = maxValue
    }
    render(){
        this.gaugeElement.innerHTML = `
            <div class = "gauge gauge-container"></div>
        `;
    }
    initializeGauge(){
        // this.cpuGauge = Gauge(this.gaugeElement.querySelector("#cpuSpeed"), {
        //     max: this.maxValue,
        //     value: this.value,
        //     label: function(value){
        //         return Math.round(value) + "/" + this.max
        //     },
        //     color: function(value){
        //         return "#019267"; // red
        //     }
        // })
        // this.cpuGauge.setValueAnimated(4, 4)
        options = {
            values: {
                1: '1',
                4: '4',
                7: '7',
            },
            colors: {
                1: "#666",
                4: "#ffa500",
                7: "f00",
            },
            angles: [
                180,
                360,
            ],
            lineWidth: 10,
            arrowWidth: 20,
            arrowColor: '#ccc',
            inset: true,
            value: this.value
        };

    }
    renderAll(){
        this.render();
        this.initializeGauge();
        this.appendChildren();
    }
    appendChildren(){
        this.appendChild(this.gaugeElement);
    }
}

customElements.define("gauge-element", GaugeElement);
export default GaugeElement;