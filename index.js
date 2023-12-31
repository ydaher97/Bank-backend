import express from 'express';
import bankRoutes from './routes/bankRoute.js'; 
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', bankRoutes);
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 