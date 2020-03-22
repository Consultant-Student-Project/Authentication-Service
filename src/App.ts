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

    private dbConnectionAttempts: number;

    constructor(port: number) {
        this.dbConnectionAttempts = 0;
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
        this.dbConnectionAttempts++;
        mongoose.connect(connectionURL, options, (err: mongoose.Error) => {
            if (err) {
                console.error('Error occured when connecting to db.:+' + err +
                    '\n' +
                    'trying again to connect... ');
                if (this.dbConnectionAttempts < 3) {
                    setTimeout(() => {
                        this.connectDB(connectionURL, options, cb);
                    }, 1500);
                } else {
                    console.error(`Try to connect db ${this.dbConnectionAttempts} times..
                    But connection doesn't established. exiting...`);
                }
                return;
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
