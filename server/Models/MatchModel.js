const mongoose = require('mongoose');
const {User} = require('./AuthModel')

const LikeSchema = new mongoose.Schema({
    user: String,
    opponent: String,
    matched: String,
    //для определения тех кто был в выборе
    isChosen: { type: Boolean, default: false },
    //для опредения лайк или нет 
    isDisliked: { type: Boolean, default: false },
})




const Matches = mongoose.model('Matches', LikeSchema)

class MatchModel {

    static async getList(email, gender, breed, age, city) {

        console.log(age)
        const Conditions = { email: { $ne: email }, gender: {$ne: (gender === 'boy' ? 'boy' : 'girl')}, age: {$gt: age[0], $lt: age[1]}, city }

        const allUsers = await User.find({city});
        console.log(allUsers.length);

        if(breed){Conditions.breed = breed}
        try {
            const usersWithoutMatches = await User.aggregate([
                {
                    $match: Conditions, // Исключаем текущего пользователя из результатов
                },
                {
                    $lookup: {
                        from: 'matches',
                        let: { currentUser: '$email' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$opponent', '$$currentUser'] },
                                            { $eq: ['$isChosen', true] },
                                            { $eq: ['$user', email] },
                                        ],
                                    },
                                },
                            },
                        ],
                        as: 'matches',
                    },
                },
                {
                    $match: { 'matches.0': { $exists: false } },
                },
                {
                    $project: { matches: 0 },
                },
            ]);
    
            // console.log(usersWithoutMatches.length)
            return usersWithoutMatches;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    
    
    
    


      static async getMatches (email, breed) {
        try {
            const matches = await Matches.find({ user: email, $expr:{$eq: ['$matched', '$opponent']}}, 'matched');
            return matches.map(match => match.matched);
          } catch (error) {
            console.error('Error:', error);
            throw error;
          }
      
      }
    
      


    static  async like  (user, opponent){
        const isAlreadyMatched = await Matches.findOne({user: opponent, opponent: user})
        if(!isAlreadyMatched) {
            const newChoose = new Matches({user, opponent, isChosen: true})
            const newchoose = await newChoose.save()
            // console.log(newchoose)
        } else {
            if(isAlreadyMatched.isDisliked) {
                // console.log('DISSSSLOKE')
                const newUser = await new Matches ({user, opponent, isChosen: true})
                const savedUser = newUser.save()
                return
            }
            const newUser = await new Matches ({user, opponent, matched: opponent, isChosen: true})
            const savedUser = newUser.save()
            const updatedOpponent = await Matches.updateOne({user: opponent, opponent: user}, {matched: user, isChosen: true})
            // console.log('DATA',savedUser,  updatedOpponent)
        }
        const updatedUser  = await User.updateOne({email:user}, {$inc: {attempts:1}})
    }


    static async disLike (user, opponent){
        console.log('DISLIKE')
            const newDislike = new Matches({user, opponent, isChosen: true,  isDisliked: true })
            const newchoose = await newDislike.save()
            const updatedUser = await User.updateOne({email: user}, {$inc: {attempts: 1}});

            console.log(user)
            console.log('Updated User:', updatedUser);
    }
}


module.exports = MatchModel