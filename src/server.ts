import App from "./app";
import { PORT } from "./config";

// const port = process.env.PORT || 3000;
const app = new App(PORT as number);
app.listen();
