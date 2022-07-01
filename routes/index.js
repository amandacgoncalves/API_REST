module.exports = app => {
    // Criando rota que a acessivel pelo meto get
    app.get('/', (req, res) => {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>PEdro API-rest</h1>');
    });

};