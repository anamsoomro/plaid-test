const {User, db} = require ('./models/User') // you need the connection to the database and Campus model

const seed = async () => {
  await db.sync({force: true}) //sync to your database!

  const anam = await User.create({
    username: 'anamsoomro',
    password: 'abc',
    email: 'anamsoomroed@gmail.com'
  })
  const sik = await User.create({
    username: 'sikendershahid',
    password:'abc', // in real action I should store the hashed password
    email: 'sikendershahid91@gmail.com'
  })
  db.close() //close your db connection else the connection stays alive else your process hangs.
  console.log('Seed Successful!') //Have a prompt to let you know everything is working correctly!
}

seed() //initialize the sync!