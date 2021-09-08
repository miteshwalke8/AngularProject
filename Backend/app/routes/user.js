const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    
    // params: firstName, lastName, email, mobileNumber, password, apiKey.
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

   

    /**
     * @apiGroup User 
     * @apiVersion 1.0.0
     * @api {post} /api/v1/users/signup Signup
     * 
     * @apiParam {string} firstName First name of user. (body params)(required)
     * @apiParam {string} lastName Last name of user. (body params)(required)
     * @apiParam {string} email Email of user. (body params)(required)
     * @apiParam {string} password Password of user. (body params)(required)
     * 
     * 
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
      "error": false,
      "message": "User created",
      "status": 200,
      "data": {
          null
      }
  }
    */

    app.post(`${baseUrl}/login`, userController.loginFunction);

     /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
    "error": false,
    "message": "Login Successful",
    "status": 200,
    "data": {
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkE3QUltOVdQQyIsImlhdCI6MTYwMjU3MzIzNzAxNiwiZXhwIjoxNjAyNjU5NjM3LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6MCwiZW1haWwiOiJtZWh0YW5ha3V1bDA2QGdtYWlsLmNvbSIsImxhc3ROYW1lIjoiTWVodGEiLCJmaXJzdE5hbWUiOiJOYWt1dWwiLCJ1c2VySWQiOiIxd1h2Nk9NSWYifX0.NDbn6B5BaQRaxvIO-x1wT7t4bYJ9JcVpEQwBAJJlTH8",
        "userDetails": {
            "mobileNumber": 0,
            "email": "mehtanakuul06@gmail.com",
            "lastName": "Mehta",
            "firstName": "Nakuul",
            "userId": "1wXv6OMIf"
        }
    }
}
    */


    

    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);
    /**
     * @apiGroup User 
     * @apiVersion 1.0.0
     * @api {post} /api/v1/users/logout/:userId  Logout
     * 
     * @apiParam {string} userId User ID of the user (body params)(required)
     * @apiParam {string} authToken Authorization Token of user (body params)(required) 
     * 
     * 
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
        "error":false,
        "message":"Logged out successfully",
        "status":200,
        "data":null
        }
     */


}
module.exports = {
    setRouter: setRouter
}
