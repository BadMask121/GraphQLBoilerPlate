const {
    InvalidException,
    NullException,
    ErrorHandler
} = require('../../miscellaneous/error/errorHandler')



// Validate if user with user email exists
async function validateUser(ctx, args){

    /**
     * 
     * @var UserExist checks if user of same data exists before creating the user 
     */
    const userExist = await ctx.prisma.userAuth({
        email:args
    }).catch( async() => {
        const user = await ctx.prisma.user({id: args})
            if(user)
                return true
    })
        if (userExist)
            return true

    return false
}

/**
 * @var validateBusinessDetail checks if business contact email supplied on sign up already exists
 */
async function validateBusinessDetail (ctx, args){
    const validateBusinessDetail = await ctx.prisma.businessDetails({
        contactEmail: args.businessDetails.contactEmail
    })
        if (validateBusinessDetail)
           return true

    return false;  
}

module.exports = {
    validateUser,
    validateBusinessDetail
}