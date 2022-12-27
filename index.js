const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Fresh today server is running.')
})

app.listen(port, () => {
  console.log(`Fresh today server is running on port ${port}`)
})