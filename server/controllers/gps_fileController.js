const uuid = require('uuid')
const path = require('path');
const {Gps_file} = require('../models/models')
const ApiError = require('../error/ApiError')

class Gps_fileController {
    async create(req, res, next){
        try{
            // gps_file формат .gpx
            const {name, description, typeId} = req.body
            const {gps_filegpx} = req.files
            const {img} = req.files
            let fileNameGPS = uuid.v4() + ".gpx"
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            gps_filegpx.mv(path.resolve(__dirname, '..','staticgps', fileNameGPS))

            const gps_files = await Gps_file.create({name, description, gps_file: fileNameGPS, typeId, img: fileName})

            return res.json(gps_files)   
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res){
        let {typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page + limit -limit
        let gps_files;
        if (!typeId){
            gps_files = await Gps_file.findAndCountAll(limit, offset)
        }
        if (typeId){
            gps_files = await Gps_file.findAndCountAll({where: {typeId}, limit, offset})
        }
        return res.json(gps_files)
    }
    

    async getOne(req, res){
       const {id} = req.params
       const gps_file = await Gps_file.findOne(
        {
            where : {id}
            
        }
       )
       return res.json(gps_file)
    }
}

module.exports = new Gps_fileController()