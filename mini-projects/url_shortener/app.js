import express from 'express';
import { shortenerRoutes } from'./routes/shortener.routes.js'
import { env } from './config/env.js';
import { connectDB } from './config/db-client.js';

const app = express();
const PORT = env.PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs")

app.use(shortenerRoutes)

try {
    await connectDB();
    app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});   
} catch (error) {
    console.error(error);
};
