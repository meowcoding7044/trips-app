import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import { rateLimit } from 'express-rate-limit';
import tripRoutes from './routes/trip.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 100, 
});

app.use(cors());
app.use(limiter);
app.set('trust proxy', 1);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Root Route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// API Routes
app.use('/api', tripRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
