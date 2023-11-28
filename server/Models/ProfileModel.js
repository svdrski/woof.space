const {User} = require('./AuthModel')

class ProfileModel {
    static async Update (data){

        try{
            const updateData = {};

            if (data.city) {
            updateData.city = data.city;
            }
    
            if (data.name) {
            updateData.name = data.name;
            }
    
            const update = await User.updateOne({_id: data.id}, updateData)
        } catch (e) {return e}
        
    }


    static async Get (id){

        try{
         const user = await User.findOne({_id: id})
         return user         
        } catch (e) {throw e }
        
    }


}

module.exports = ProfileModel