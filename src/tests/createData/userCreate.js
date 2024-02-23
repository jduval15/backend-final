const User = require("../../models/User")

const userCreate = async () => {

  await User.create(
    {
      firstName: 'Pedro',
      lastName: "Jimenez",
      email: "pedro@gmail.com",
      password: 'pedro1234',
      phone: '123456'
    }
  )

}

module.exports = userCreate