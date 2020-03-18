import * as express from 'express';
import * as http from 'http';
import routes from './routes'

class App {

    public express: express.Application
    public server: http.Server;
    public port: number;

    constructor(port: number) {
        this.express = express();
        this.port = port;
        this.express.use('/', routes);
    }



    public start() {
        this.server = this.express.listen(this.port, () => {
            console.log(`${this.port} is listening...`);
        });
    }

}


export default App;
