import runtime from 'serviceworker-webpack-plugin'

class _ServiceWorkerInitializer{
    constructor(){
        if (_ServiceWorkerInitializer.instance == null){
            _ServiceWorkerInitializer.instance = this;
        }
    }
    async initialize(){
        if ('serviceWorker' in navigator){
            await runtime.register();
            return;
        }
        console.warn('Service worker is not supported on this browser!');
    }
}

const ServiceWorkerInitializer = new _ServiceWorkerInitializer()
Object.freeze(ServiceWorkerInitializer)
export default ServiceWorkerInitializer