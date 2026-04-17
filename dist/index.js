import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// routers
// server connection
app.listen(3000, () => {
    console.log('server is on...');
});
//# sourceMappingURL=index.js.map