const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token.model')

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

    return { accessToken, refreshToken }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({user: userId})

    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    return await tokenModel.create({user: userId, refreshToken})
  }

  async removeToken(refreshToken){
    return tokenModel.deleteOne({refreshToken});
  }

  async findToken(refreshToken){
    return tokenModel.findOne({refreshToken});
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }
}

module.exports = new TokenService();
