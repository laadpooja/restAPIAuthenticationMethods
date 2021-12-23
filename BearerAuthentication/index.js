const express = require('express');
const app = express();
app.use(express.json());

const PORT = 5000;

require('./middleware')(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})