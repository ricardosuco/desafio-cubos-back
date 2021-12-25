const app = require('./servidor');

const port = process.env.PORT || 3001;
app.listen(port, console.log(`Escutando porta ${port}...`));
