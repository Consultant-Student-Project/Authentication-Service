import * as express from 'express';
import * as http from 'http';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import TimeoutMiddleware from './middleware/TimeoutMiddleware';
import routes from './routes';

class App {

    public express: express.Application;
    public server: http.Server;
    public port: number;

    constructor(port: number) {
        this.express = express();
        this.port = port;
        this.setMiddlewares();
        this.express.use('/', routes);
    }

    setMiddlewares = () => {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(morgan('tiny'));
        this.express.use(helmet());
        this.express.use(new TimeoutMiddleware().instance);
    }

    public connectDB(connectionURL: string, options: any = null, cb: () => void) {
        mongoose.connect(connectionURL, options, (err: mongoose.Error) => {
            if (err) {
                return console.error('Error occured when connecting to db ');
            }
            console.log('Database connection established.');
            return cb();
        });
    }

    public start() {
        this.server = this.express.listen(this.port, () => {
            console.log(`${this.port} is listening...`);
        });
    }

}


export default App;
