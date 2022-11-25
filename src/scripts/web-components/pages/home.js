import University from "../../classes/university";
import Localization from "../../utils/localization";
import GridElement from "../templates/grid-element";

class HomePage extends HTMLElement{
    constructor(){
        super();
        this.homeElement = document.createElement('div');
    }

    async init(){
        this.render();
        this.appendChildren();
    }

    _getJumbotronElement(){
        return `
            <div class = "jumbotron">
                <div class = "row" id = "row-1">
                    <img src = "./images/work-contribution.png" id = "work-contribution-image">
                </div>
                <div class = "row" id = "row-2">
                    <h1 data-i18n-key = "entreprenurial_mindfullness_is">Entrepreneurial Mindfulness is…</h1>
                    <h2 data-i18n-key = "find_balance">finding balance in your entrepreneurial journey.</h2>
                </div>
            </div>
        `;
    }

    _getTentangKamiElement(){
        return `
            <h2 data-i18n-key = "about_us">About Us</h2>
            <p data-i18n-key = "about_us_content_1">Entrepreneurial Mindfulness merupakan sebuah website dengan instrumen yang mengukur kapabilitas seseorang untuk berfokus dan perhatian terhadap sesuatu yang menjadi rangkaian penting dalam proses menjadi sekaligus menjalankan praktik kewirausahaan.</p>
            <p data-i18n-key = "about_us_content_2">Instrumen Entrepreneurial Mindfulness dikembangkan oleh Research Interest Group (RIG) Edutech melalui Hibah Internasional BINUS University, berkolaborasi dengan berbagai institusi dari Indonesia dan Malaysia:</p>
        `;
    }

    _getConclusionElement(){
        return `
            <p data-i18n-key = "about_us_content_3">Kami berharap instrumen ini dapat membantu Anda menemukan keseimbangan dalam perjalanan kewirausahaan Anda.</p>
        `;
    }

    _getUniversitiesElement(){
        const universityElements = `
            <li>Pusat Penelitian Kebijakan Pendidikan Tinggi, Balitbangdikbud, Kemendikbud RI (PUSLITJAKDIKBUD)</li>
            <li>Universitas Agung Podomoro (UAP)</li>
            <li>Universiti Teknologi Malaysia (UTM)</li>
            <br>
        `

        let pointsElement = document.createElement("ul")
        pointsElement.innerHTML = universityElements

        return pointsElement.innerHTML;
    }

    render(){
        this.homeElement.innerHTML = `
            ${this._getJumbotronElement()}
            <div class = "container">
                ${this._getTentangKamiElement()}
                ${this._getUniversitiesElement()}
                ${this._getConclusionElement()}
            </div>
        `;
    }

    appendChildren(){
        this.appendChild(this.homeElement);
    }
}

customElements.define("home-page", HomePage);
export default HomePage;