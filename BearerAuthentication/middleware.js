const jwt = require('jsonwebtoken');

module.exports = (app) => {

  const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token === undefined) {
      res.status(401).send({
        success: "fail",
        message: "Missing authorization token"
      });
    }

    if (token.startsWith('Bearer')) {
      token = token.slice(7, token.length);
    }


    jwt.verify(token, 'thisismysecret', (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          message: 'Either token expired or sending wrong token.'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    })

  };

  app.post('/login', function(req, res) {
    const loginData = req.body.loginData;
    const userName = "admin";
    const password = "root@12345";

    if (userName === loginData.userName && password === loginData.password) {

      const token = jwt.sign({
        userName: userName,
        role: 'amin',
        email: 'bearertest@gmail.com'
      }, 'thisismysecret', {
        expiresIn: 90
      });

      return res.status(200).send({
        token: token
      });
    }

    return res.status(401).send('Unauthorized');
  });

  app.post('/mysecuredendpoint', function(req, res) {
    checkToken(req, res, (decoded) => {

      console.log(req.decoded);
      return res.status(200).send({
        data: "success"
      });

    });
  });



}