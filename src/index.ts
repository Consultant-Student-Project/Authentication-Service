import App from './App';

const port = 3000;


const connectionURL =
    process.env.DB_CONNECT_URL
    || 'mongodb://mongo:27017/ConsultantStudentProject';
console.log(connectionURL);
const app = new App(+port);

app.connectDB(connectionURL,
    { useNewUrlParser: true, useUnifiedTopology: true }
    , () => {
        app.start();
    });
