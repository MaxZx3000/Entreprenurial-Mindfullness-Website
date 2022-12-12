class VideoIntervensiPage extends HTMLElement{
    constructor(){
        super();
        this.videoIntervensiElement = document.createElement("div");
    }
    render(){
        this.videoIntervensiElement.innerHTML = `
            <div class = "container">
                <br>
                <p data-i18n-key = "video_intervensi_message"></p>
                <div class="accordion" id="accordionExample">
                    <div class="card">
                        <div class="card-header" id="headingOne">
                            <h2 class="mb-0">
                                <button data-i18n-key = "entrepreneurial_mindfulness_english_video" class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    
                                </button>
                            </h2>
                        </div>
                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
                                <iframe src="https://www.youtube.com/embed/CF90Ri8nVcs" class = "youtube_video" style = "width: 100%; height: 400px"></iframe>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="headingTwo">
                            <h2 class="mb-0">
                                <button data-i18n-key = "entrepreneurial_mindfulness_indonesian_video" class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    
                                </button>
                            </h2>
                        </div>
                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div class="card-body">
                                <iframe src="https://www.youtube.com/embed/AIMdnAXn7Kk" style = "width: 100%; height: 400px"></iframe>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="headingThree">
                            <h2 class="mb-0">
                                <button data-i18n-key = "entrepreneurial_mindfulness_benefit" class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    
                                </button>
                            </h2>
                        </div>
                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                            <div class="card-body">
                                <iframe src="https://www.youtube.com/embed/iLPMbAEGeEM" style = "width: 100%; height: 400px"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    async init(){
        this.render()
        this.appendChildren()
    }
    appendChildren(){
        this.appendChild(this.videoIntervensiElement);
    }
}

customElements.define("video_intervensi-element", VideoIntervensiPage);
export default VideoIntervensiPage