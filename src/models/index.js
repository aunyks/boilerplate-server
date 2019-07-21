// The sequelize library (Sequelize) and an instance
// of sequelize (sequelize)
module.exports = (lib, instance) => {
  const { Model } = lib

  class User extends Model { }
  User.init({
    id: { type: lib.STRING, primaryKey: true },
    email: { type: lib.STRING },
    name: { type: lib.STRING },
  }, { sequelize: instance, modelName: 'user' })

  // use { force: true } *in dev* if
  // a migration doesnt work smoothly
  instance.sync({ alter: true })

  return {
    User
  }
}