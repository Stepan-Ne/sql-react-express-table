import express from 'express';
// import cors from 'cors';
import db from './dbConfig.js';
import path from 'path';
// import items from './items.js';
import userRoutes from './routes/user.routes.js';

// Server
const app = express();
app.use(express.json());

// Connect DB
// db.connect((err) => {
// if (err) {
//   throw err;
// }
// console.log("MySQL connected...")
// })

// Use Routes
app.use('/api', userRoutes);

// If PRODUCTION
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server is running...');
});
