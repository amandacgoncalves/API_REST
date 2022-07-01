let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.db',
    autoload: true
})


// const { check, validationResult } = require("express-validator");

module.exports = app => {

    let route = app.route('/users');

    // Metodo para chamar
    route.get((req, res) => {

        // consultar todos no banco
        db.find({}).sort({ name: 1 }).exec((err, users) => {

            if (err) {

                app.utils.error.send(err, req, res);
            } else {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    users
                });
            }
        });


    });

    // metodo para inseirir
    route.post((req, res) => {

        if (!app.utils.validator.user(app, req, res)) return false;

        db.insert(req.body, (err, user) => {

            if (err) {
                app.utils.error.send(err, req, res);
            } else {

                res.status(200).json(user);

            }

        });

    });

    let routeId = app.route('/users/:id');

    // metedo para consultar
    routeId.get((req, res) => {

        // consulta 1 so no banco
        db.findOne({ _id: req.params.id }).exec((err, user) => {
            if (err) {
                app.utils.error.send(err, req, res)
            } else {
                res.status(200).json(user);
            }
        });


    });

    // metodo para alterar
    routeId.put((req, res) => {

        if (!app.utils.validator.user(app, req, res)) return false;

        db.update({ _id: req.params.id }, req.body, err => {

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.params, req.body));
            }

        });

    });

    // para deletar
    routeId.delete((req, res) => {

        // nedb delete no banco
        db.remove({ _id: req.params.id }, {}, err => {

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(req.params);
            }

        });
    });
};

// nedb
// consulta find para todos findOne para 1 so
// alterar update
// cadastrar insert
//  para deletar remove