const Joi = require('joi')

module.exports = {
  register (req, res, next){
    const schema = Joi.object().keys({
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }).with('email','password')

    const {error, value} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide valid email'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:
              <br>
              1.It must contain ONLY the following characters: lower case, upper case, numerics
              <br>:
              2.Atleast 8 characters in lenghth and less than 32 
            `
          })
          break
        default:  
          res.status(400).send({
            error: 'Invalid registration information'
          })
         
      }

    } else {
      next()
    }
  }    
}
