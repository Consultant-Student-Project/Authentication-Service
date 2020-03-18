import App from './App';

let port = process.env.PORT || 3000;

let app = new App(+port);
app.start();