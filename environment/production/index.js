/**
 * 
 * This is the Production configuration file for Symetry if you want to make any config
 * changes to symmetry  on prod do it here
 */

const redis = require('../../src/services/redisClient')
const fs = require('fs')
const path = require('path')
// eslint-disable-next-line no-undef
const {
  env
} = process


let signUpUsermailMessageFile = path.join(__dirname, '../../src', '/services', 'mail', 'letter/signUpEmail.html')
let inviteUserMailMessageFile = path.join(__dirname, '../../src', '/services', 'mail', 'letter/inviteUserEmail.html')

signUpUsermailMessageFile = path.resolve(signUpUsermailMessageFile).normalize()
inviteUserMailMessageFile = path.resolve(inviteUserMailMessageFile).normalize()


const THOUSAND = 1000
const SIXTY = 60
const TWENTY_FOUR = 24
const EXPIRATION_TIME = THOUSAND * SIXTY * SIXTY * TWENTY_FOUR * 30


//set default cookie token expiration date to 30 days
const emailExpirationTime = () => new Date().getTime() + (EXPIRATION_TIME)

const config = {

  /***
   * 
   * app @var ACCESS_SECRET from our.env file
   */
  ACCESS_SECRET: env.ACCESS_SECRET,


  /**
   * default cookie expiration time
   */
  getDefaultCookieExpiration: () => emailExpirationTime(),

  /**
   * 
   * our default jwt authorization expiration time that will be used if 
   * an expiration time is not set on generateToken(data, expire) in /misc/helper.js
   */
  DEFAULT_JWT_TOKEN_EXPIRATION: '24h',


  // server endpoint
  endpoint: '/',

  /***
   * 
   * our Set environment for App stages
   * 
   * note use @env NODE_ENV only on development
   * switch to @env APP_ENV when on staging or production
   */
  env: env.NODE_ENV || env.APP_ENV,

  // defining file System to be used by other import configs files
  fs,




  /**
   * 
   * app @var host for our running endpoint used for our api
   */
  host: `http://${env.HOST}:${env.PORT}`,




  /**
   * 
   * core @mailConfig config
   for sending emails
  */
  mailConfig: {
    smtpServer: {
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      secure: false,
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS
      }
    },
    attachments: {
      fileAttachment: [],
      mailMessage: {
        signUpEmail: signUpUsermailMessageFile,
        inviteUser: inviteUserMailMessageFile
      }
    },


    /**
     * @var confirmationUrl using localhost for testing will 
     * switch to mail server when ready
     */
    confirmationEmail: {
      signUpVerifyUrl: "http://localhost:8080/emailConfirm",
      signUpVerifyFrom: "jeffreyefemena4@gmail.com",
      signUpEmailSubject: "Confirm Your Symmetry App Email"
    },
    inviteUserEmail: {
      FromUrl: "http://localhost:8080/invite",
      From: "jeffreyefemena4@gmail.com",
      Subject: "An Invitation Awaiting Acceptance"
    },
    template: {

      /**
       * our @var signUpVerify Templates are for replacing messages in our messages
       * please @note that the last element in the array replacement object will
       * be changed to @var emailConfirmationUrl
       * 
       */
      signUpVerify: {
        word: [
          "#emailname",
          "#emailconfirmurl"
        ]
      },
      inviteUser: {
        word: [
          "#emailname",
          "#businessname",
          "#inviteurl"
        ]
      }
    }
  },



  /***
   * 
   * 
   * permission Flags accepted for adding new permissions to database
   *  @NOTE any flags added here should be added to enums schema in our schema.graphql
   * 
   * @var key: DefaultPermissionsNameEnum (in schema)
   * @var value: DefaultRoleDefinitionEnum (in Schema)
   */
  permissionFlags: {
    ADMIN: "AD",
    SEMI_ADMIN: "SA"
  },



  /**
   * 
   *  app @var port number for running node
   */
  port: env.PORT,

  /**
   * 
   * defining our path module to our config
   */
  path,

  // redis client object
  redis,

  REDIS_URL: env.REDISCLOUD_URL,

  /**
   * 
   * schema for database
   */
  schema: './src/schema/schema.graphql',



  /**
   * app superUser Access secret for making inHouse(DIVERGENT) changes
   */
  SUPER_ACCESS_SECRET: env.SUPER_ACCESS_SECRET,


  /**
   * 
   * app @var stage objects
   */
  stage: {
    DEVELOPMENT: "development" || "dev",
    STAGING: "staging" || "stag",
    PRODUCTION: "production" || "prod"
  },



}

module.exports = config