import express from 'express';
import { shortenerRoutes } from'./routes/shortener.routes.js'
import { env } from './config/env.js';

const app = express();
const PORT = env.PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs")

app.use(shortenerRoutes)

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});
