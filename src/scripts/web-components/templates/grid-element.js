class GridElement extends HTMLElement{
    constructor(){
        super();
        this.gridElement = document.createElement("div");
    }
    setChildElements(elements){
        this.childElements = elements;

    }
    setPerElementSize(smallSize = 12, mediumSize = 6, largeSize = 4){
        this.smallSize = smallSize;
        this.mediumSize = mediumSize;
        this.largeSize = largeSize;
    }
    _getElementsInGrid(){
        let elements = document.createElement('div');
        this.childElements.forEach(element => {
            elements.innerHTML += `
                <div class = "col-sm-${this.smallSize} col-md-${this.mediumSize} col-lg-${this.largeSize}">
                    ${element}
                </div>
            `;
        });
        return elements.innerHTML;
    }

    render(){
        this.gridElement.innerHTML = `
            <div class = "row">
                ${this._getElementsInGrid()}
            </div>
        `;
    }   

    appendChildren(){
        this.appendChild(this.gridElement);
    }
}

customElements.define("grid-element", GridElement);
export default GridElement;