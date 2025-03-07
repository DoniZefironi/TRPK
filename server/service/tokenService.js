const jwt = require("jsonwebtoken");
const {Refresh_Token} = require("../models/models");
class TokenService {

generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '10d' });
    return {
        accessToken,
        refreshToken
    }
}
   validateAccessToken(accessToken){
    try{
        const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        return userData;
    }
    catch(err){
        return null;
    }
   }
    validateRefreshToken(refreshToken){
        try{
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            return userData;
        }
        catch(err){
            return null;
        }
    }
    async saveToken(user_id, refreshToken) {
        try {
            console.log("Saving token for user_id:", user_id);
            console.log("Refresh Token:", refreshToken);

            const tokenData = await Refresh_Token.findOne({ where: { id_user: user_id } });
            console.log("Refresh Token tokenData:", tokenData);
            if (tokenData) {
                console.log("Updating existing token");
                tokenData.refresh_token = refreshToken;
                await tokenData.save();
            } else {
                console.log("Creating new token");
                await Refresh_Token.create({ id_user: user_id, refresh_token: refreshToken });
            }
        } catch (error) {
            console.error("Error saving token:", error);
        }
    }
    async removeToken(refreshToken) {
        const tokenData = await Refresh_Token.destroy({
            where: {
                refresh_token: refreshToken
            }
        });
        return tokenData;
    }
    async findToken(refreshToken){
        const tokenData = await Refresh_Token.findOne({where: {refresh_token: refreshToken}})
        console.log('Заход с поиском')
        console.log(refreshToken)
        console.log(tokenData)
        return tokenData;
    }

}
module.exports =  new TokenService();