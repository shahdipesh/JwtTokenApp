const express = require('express');
const app = express();
const users = require('./users/users.route');
var cors = require('cors')
app.use(express.json());

app.use(cors())
app.use('/api',users);

app.get('/',(req,res) => {
  res.send("Root route")
})



app.listen(8080, function() {
  console.log("Express is running on port 8080");
});
