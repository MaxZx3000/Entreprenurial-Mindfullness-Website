class _FetchHelpers{
    constructor(){
        if (_FetchHelpers.instance == null){
            _FetchHelpers.instance = this
        }
        return _FetchHelpers.instance;
    }
    getDefaultRequestBody(){
        return {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                mode: 'cors',
            },
        }
    }
    async getJSONResult(apiURL, apiData){
        // try{
            const response = await fetch(apiURL, apiData)
            const json = await response.json()
            const responseStatus = response.status;
            return {"json": json, "status": responseStatus};
        // }
        // catch(e){
        //     return {"json": "Unknown Error Occured", "status": -1}
        // }
        
    }
}

const FetchHelpers = new _FetchHelpers();
export default FetchHelpers