const ProfileModel = require('../Models/ProfileModel.js')

class ProfileController {

    static async Update (req,res){
        try{
            const save = await ProfileModel.Update(req.body)
            res.status(203).send('Updated')

        } catch (e) {res.send('Error ' + e)}
    }

    static async Get (req,res){
        try{
            const save = await ProfileModel.Get(req.params.id)
            res.status(200).send(save)
        } catch (e) {res.status(404).send('User not found')}
    }



}

module.exports = ProfileController