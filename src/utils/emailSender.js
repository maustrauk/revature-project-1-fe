import emailjs from 'emailjs-com';

 const sendEmail = (data, from_name, template_id) => {

    let templ;


    switch(template_id) {
        case 1:
            templ = process.env.REACT_APP_TEMPLATE_ID_1;
            console.log("temp 1:", templ);
            break;
        case 2:
            templ = process.env.REACT_APP_TEMPLATE_ID_2;
            console.log("temp 2:", templ);
            break;
        default:
            console.log("Wrong template");
    }


    emailjs.init(process.env.REACT_APP_USER_ID);



    const templateParams = {
        to_name: data.userFirstName,
        from_name: from_name,
        user_name: data.userName,
        password: data.userPassword,
        to_address: data.userEmail
    };
    
    emailjs.send(process.env.REACT_APP_SERVICE_ID, templ, templateParams )
        .then((response) => {
           console.log('SUCCESS!', response.status, response.text);
        }, (err) => {
           console.log('FAILED...', err);
        }); 
}

export default sendEmail;