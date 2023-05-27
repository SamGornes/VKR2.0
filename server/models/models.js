const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
}  )
const Gps_file = sequelize.define('gps_file', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    //description: {type: DataTypes.STRING, allowNull: false},
    gps_file: {type: DataTypes.STRING, defaultValue: 0 },
    //создание временного каталога после в базе данных нужно прописать путь к файлу
    //Пользователь загружает файл,
    //Сделать форму для загрузки файла и сохранить во временный католог на сервер
    
}  )
const Image = sequelize.define('image', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    img: {type: DataTypes.STRING, defaultValue: 0 },
}  )
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
}  )
const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    description: {type: DataTypes.STRING, allowNull: false},
}  )

User.hasMany(Gps_file)
Gps_file.belongsTo(User)

Type.hasMany(Gps_file)
Gps_file.belongsTo(Type)

Gps_file.hasMany(Image)
Image.belongsTo(Gps_file)

Gps_file.hasMany(Comment)
Comment.belongsTo(Gps_file)

User.hasMany(Comment)
Comment.belongsTo(User)

module.exports = {
    User, 
    Type, 
    Gps_file, 
    Comment, 
    Image
}
