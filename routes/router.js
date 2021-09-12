const express = require('express');
const router = express.Router();
const user=require("../services/user");

// Please don't modify /setupdb router code
router.get("/setupdb",user.insertPacakges);


/*configure the router object to handle the POST request to '/register'
add a new user using registerUser of service/user.js, request body holds the details of the new user
*/

router.post('/register',user.registerUser);

/*configure the router object to handle the POST request to '/login'
login the registered users using loginUser of service/user.js, request body holds the details of the user 
*/

router.post('/login',user.loginUser);

/*configure the router object to handle the GET request to '/viewpackages'
dispaly the Package details using the viewpackages of service/users.js
*/

router.get('/viewpackages',user.viewPackageDetails);

/*configure the router object to handle the PUT request to '/bookaslot'
book a slot for user using bookaslot of service/user.js, pass request body as parameter
*/

router.put('/bookaslot',user.bookaslot);

/*configure the router object to handle the PUT request to '/cancelbooking/:userEmail'
book a slot for user using cancelbooking of service/user.js, pass request body as parameter
*/

router.put('/cancelbooking/:userEmail',user.cancelbooking);

/*configure the router object to handle the DELETE request to '/deleteuser'
Delete the user information using deleteUser of service/user.js, pass request body as parameter
*/

router.delete('/deleteuser',user.deleteUser);

/*configure the router object to handle the ALL invalid request implement in service invalid method

*/

router.all('*',user.invalid);

module.exports=router;