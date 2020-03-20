import App from './App';

const port = process.env.PORT || 3000;

const connectionURL =
    process.env.DB_CONNECT_URL
    || 'mongodb://localhost:27017/ConsultantStudentProject';

const app = new App(+port);

app.connectDB(connectionURL,
    { useNewUrlParser: true, useUnifiedTopology: true }
    , () => {
        app.start();
    });
