const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://127.0.0.1:27017/botnet');

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
