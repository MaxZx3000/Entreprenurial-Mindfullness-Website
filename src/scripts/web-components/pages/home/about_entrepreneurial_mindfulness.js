class AboutEntrepreneurialMindfulnessPage extends HTMLElement{
    constructor(){
        super();
        this.aboutEntrepreneurialMindfulnessElement = document.createElement('div');
    }

    async init(){
        this.render();
        this.appendChildren();
    }

    _getTentangKamiElement(){
        return `
            <h2 data-i18n-key = "about_us"></h2>
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
        this.aboutEntrepreneurialMindfulnessElement.innerHTML = `
            <br>
            <div class = "container">
                ${this._getTentangKamiElement()}
                ${this._getUniversitiesElement()}
                ${this._getConclusionElement()}
            </div>
        `;
    }

    appendChildren(){
        this.appendChild(this.aboutEntrepreneurialMindfulnessElement);
    }
}

customElements.define("about_entrepreneurial_mindfulness-page", AboutEntrepreneurialMindfulnessPage);
export default AboutEntrepreneurialMindfulnessPage;