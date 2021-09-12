let validator = {}

/*

This method should check wthether password have minimum of 8 characters
If not validated throw an error with message by creating a new error object and setting message as "Password should be have minimum of 8 characters"
and set HTTP status code to 400
        for eg. 
        let err = new Error("Password...");
        err.status = 400;
        throw err;

*/
validator.validatePassword = (pass) => {
    if(pass && pass.length>=8) return true;
    else{
        let err=new Error('Password should be have minimum of 8 characters');
        err.status=400;
        throw err;
    }
}


/*

This method should check wthether phoneno have 10 digits, if success return true.
If not validated throw an error with message "Phone number should have 10 digits"
and set HTTP status code to 400

*/

validator.validatePhoneno = (ph) => {
    if(ph && ph.toString().length==10) return true;
    else{
        let err=new Error('Phone number should have 10 digits');
        err.status=400;
        throw err;
    }
}

/*

This method should check wthether emailid satisfies condition give in QP
If not validated throw an error with message "Enter a valid Email Id"
and set HTTP status code to 400

*/

validator.validateEmailid=(email)=>{
    if(email && email.match(/^.+@.+\.com$/)) return true;
    else{
        let err=new Error('Enter a valid Email Id');
        err.status=400;
        throw err;
    }
}

/*

This method should check whether shiftingType is either House or Vehicle.
Perform case insensitive comparison
If not validated throw an error with message "Shifting Type should be either House or Vehicle"
and set HTTP status code to 400

*/

validator.validateshiftType=(st)=>{
    if(st && (st.match(/^House$/i) || st.match(/^vehicle$/i))) return true;
    else{
        let err=new Error('Shifting Type should be either House or Vehicle');
        err.status=400;
        throw err;
    }
}

/*

This method should ensure that name is not empty
If not validated throw an error with message "Name cannot be empty!!!"
and set HTTP status code to 400

*/
validator.validateName = (name) => {
    if(name && name.length!=0) return true;
    else{
        let err=new Error('Name cannot be empty!!!');
        err.status=400;
        throw err;
    }
}

module.exports = validator;