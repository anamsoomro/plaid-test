const User = require('./models/User').User

User.sync() // this syncs table with db (create if not created)
.then(() => User.destroy({where: {}}))
.then(() => users.forEach(user => User.create(user)))

const users = [
    {
      username: 'anamsoomro',
      password: 'abc', // in real flow I should store the hashed password
      email: 'anamsoomroed@gmail.com'
    },
    {
      username: 'sikendershahid',
      password:'abc', 
      email: 'sikendershahid91@gmail.com'
    }
]


