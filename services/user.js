const models = require('../model/dbSchema.js');
const validator = require('../utilities/validator');

// Please don't modify insertPackages code

exports.insertPacakges = async (req, res) => {
  let check = await models.packageModel.find();
  if (check.length == 0) {
    let packages = await models.packageModel.create(models.packageDetails);
    if (packages != null) {
      res.send("Package details inserted successfully!!");
    } else {
      res.send("Package detail updation failed!!");
    }
  } else {
    res.send("Package details available in DB");
  }
};


/*
registerUser
 
1.Validate name,emailid,password and phoneno.
2.If all the validations are passed, the method should register a new user 
with the details received in the request object after ensuring that the user doesn't exists
3.On successful registration send the response in json format as below:
{ "message": "User Registered Successfully!!"}
4.else create a new error object with the message:
"Registration Failed!! Please try again...", and status code 400
pass the error to errorLogger
5.if user already exist, then create a new error object with the message:
"User Already Exists!!", and status code 400
pass the error to errorLogger
 
*/
exports.registerUser = async (req, res, next) => {
    //perform CRUD operation using await
    try {
      if(validator.validateName(req.body.name) &&
        validator.validateEmailid(req.body.emailid) &&
        validator.validatePassword(req.body.password) &&
        validator.validatePhoneno(req.body.phoneno)
      ){
        let user=await models.userModel.findOne(
          {emailid:req.body.emailid}
        );
        if(user==null){
          let temp=await models.userModel.create(req.body);
          if(temp!=null){
            res.status(200).json({
              message:`User Registered Successfully!!`
            })
          }else{
            let err=new Error('Registration Failed!! Please try again...');
            err.status=400;
            next(err);
          }
        }else{
          let err=new Error('User Already Exists!!');
          err.status=400;
          next(err);
        }
      }
    }catch(error){
      next(error);
    }
}

/*
loginUser

1.This method should authenticate user using loginUser
2.On successful login, send the response in json format as below:
{ "message": "User login successful" }
3.else create a new error onject with the message:
"Please register yourself to avail the services", and status code 400
pass the error to errorLogger

*/
exports.loginUser = async (req,res,next) => {
    //perform CRUD operation using await  
    let user=await models.userModel.findOne({
      emailid:req.body.emailid,
      password:req.body.password
    })
    console.log(req.body.emailid,req.body.password,req.body);
    if(user!=null){
      res.status(200).json({
        message:`User login successful`
      })
    }else{
      let err=new Error('Please register yourself to avail the services');
      err.status=400;
      next(err);
    }  
}

/*
viewpackages

1.This method should display the package details
2.On successful fetch, send the data fetched as json response 
3.else create a new error object with the message:
"Unable to load Package details!! Please try again..."", and status code 400
pass the error to errorLogger

*/

exports.viewPackageDetails =async (req, res,next) => {
    //perform CRUD operation using await  
    let pack=await models.packageModel.find({},{_id:0,__v:0});
    if(pack.length!=0){
      res.status(200).send(pack);
    }else{
      let err=new Error('Unable to load Package details!! Please try again...');
      err.status=400;
      next(err);
    } 
}

/*
bookaslot
1.Validate emailid and shiftingType.
2.If all validations are successful this method should allow user to book a slot for shifting.
Else, create a new error onject with the message:
"No such user. Please check your credentials" and status code 400 if user not found
pass the error caught to errorLogger
3.On successful booking, send the response in json format as below:
{ "message": "Booking Successful..." }
4.else, create a new error onject with the message:
"Unable to book a slot, please try later..." and status code 400
pass the error to errorLogger

*/
exports.bookaslot = async (req, res, next) => {
    //perform CRUD operation using await  
    try {
      if(validator.validateEmailid(req.body.emailid) &&
        validator.validateshiftType(req.body.bookings.shiftingType)
      ){
        let user=await models.userModel.findOne(
          {emailid:req.body.emailid}
        );
        if(user!=null){
          let upd=await models.userModel.findOneAndUpdate(
            {emailid:req.body.emailid},
            {bookings:req.body.bookings},
            {new:true,runValidators:true}
          )
          if(upd!=null){
            res.status(200).json({
              "message": "Booking Successful..."
            });
          }else{
            let err=new Error('Unable to book a slot, please try later...');
            err.status=400;
            next(err);
          }
        }else{
          let err=new Error('No such user. Please check your credentials');
          err.status=400;
          next(err);
        }
      } 
    }catch(error){
      next(error);
    } 
}

/*
cancelbooking

1.Validate emaild passed as request parameter.
2.If validation is successful then this method should be able to cancel booking made by a user for shifting.
Else, create a new error onject with the message:
"No such user. Please check your credentials" and status code 400 if user not found 
3.On successful cancellation, send the response in json format as below:
{ "message": "Cancellation Successful" } 
4.else, create a new error onject with the message:
"Cancellation failed!! Plaese try again..." and status code 400.
pass the error to errorLogger

*/

exports.cancelbooking = async (req, res, next) => {
    //perform CRUD operation using await
    try {
      if(validator.validateEmailid(req.params.userEmail)){
        let user=await models.userModel.findOne(
          {emailid:req.params.userEmail}
        );
        if(user!=null){
          let upd=await models.userModel.findOneAndUpdate(
            {emailid:req.params.userEmail},
            {$unset:{bookings:{}}},
            {new:true,runValidators:true}
          )
          if(upd!=null){
            res.status(200).json({
              "message": "Cancellation Successful"
            });
          }else{
            let err=new Error('Cancellation failed!! Plaese try again...');
            err.status=400;
            next(err);
          }
        }else{
          let err=new Error('No such user. Please check your credentials');
          err.status=400;
          next(err);
        }
      }
    } catch (error) {
      next(error);
    }    
}

/*
deleteUser

1.Validate emailid and shiftingType.
2.If given emailid is found then this method should be able  to delete details regarding user.
Else, create a new error onject with the message:
"No such user. Please check your credentials" and status code 400 if user not found
3.On successful deletion, send the response in json format as below:
{ "message": "Deletion Successful, user removed"}
4.else, create a new error onject with the message:
""Deletion failed!! Please try again..." and status code 400.
pass the error to errorLogger


*/
exports.deleteUser = async (req, res, next) => {
    //perform CRUD operation using await
    try {
      if(validator.validateEmailid(req.body.emailid)){
        let user=await models.userModel.findOne(
          {emailid:req.body.emailid}
        );
        if(user!=null){
          let del=await models.userModel.deleteOne({emailid:req.body.emailid})
          if(del.deletedCount!=0){
            res.status(200).json({
              "message": "Deletion Successful, user removed"
            });
          }else{
            let err=new Error('Deletion failed!! Please try again...');
            err.status=400;
            next(err);
          }
        }else{
          let err=new Error('No such user. Please check your credentials');
          err.status=400;
          next(err);
        }
      }
    } catch (error) {
      next(error);
    }    
}   


/*Invalid router 
Send the response in json format as below:
{ "message": "Resource not found" } with status code 404 */

exports.invalid = async (req, res) => {
    res.status(404).json({
      message:`Resource not found`
    })
};
