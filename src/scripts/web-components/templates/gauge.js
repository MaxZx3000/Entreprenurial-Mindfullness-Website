import Gauge from "svg-gauge/src/gauge";

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
            <div id = "cpuSpeed" class = "gauge-container"></div>
        `;
    }
    initializeGauge(){
        this.cpuGauge = Gauge(this.gaugeElement.querySelector("#cpuSpeed"), {
            max: this.maxValue,
            value: this.value,
            label: function(value){
                return Math.round(value) + "/" + this.max
            },
            color: function(value){
                return "#019267"; // red
            }
        })
        this.cpuGauge.setValueAnimated(4, 4)
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