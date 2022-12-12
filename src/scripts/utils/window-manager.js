class _WindowController{
    setWindowURLHash(newLocation){
        const baseURL = window.location.href.split('#')[0];
        window.location.href = `${baseURL}#${newLocation}`;
    }

    setWindowURL(newLocation){
        const baseURL = window.location.href.split('/');
        return `${baseURL}/${newLocation}`;
    }

    getURLHashValue(){
        var baseURL = window.location.hash;
        baseURL = baseURL.split("#")[1];
        return baseURL;
    }
    
    getURLStripParts(){
        const hashValue = this.getURLHashValue();
        var urlStripParts = hashValue.split('/');
        return urlStripParts;
    }

    getURLKeyPairHashParams() {
        const keyPairValue = {};
        const currentURL = window.location.hash;
        const urlSearchParams = currentURL.split('?')[1];
        const splittedURLParams = urlSearchParams.split('&');
        for (let i = 0; i < splittedURLParams.length; i++) {
          const splittedKeyPair = splittedURLParams[i].split('=');
          const key = splittedKeyPair[0];
          const value = splittedKeyPair[1];
          keyPairValue[key] = value;
        }
        return keyPairValue;
    }
    reloadPage() {
        window.location.reload();
    }
}

const WindowController = new _WindowController();
export default WindowController;