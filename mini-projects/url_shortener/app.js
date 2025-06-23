import express from 'express';
import { shortenerRoutes } from'./routes/shortener.routes.js'

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(shortenerRoutes)

app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
});
