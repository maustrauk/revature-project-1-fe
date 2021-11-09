# Expense Reimbursement System (ERS) 

## Project Description
The Expense Reimbursement System (ERS) will manage the process of reimbursing employees for expenses incurred while on company time. All employees in the company can login and submit requests for reimbursement and view their past tickets and pending requests. Finance managers can log in and view all reimbursement requests and past history for all employees in the company. Finance managers are authorized to approve and deny requests for expense reimbursement.

## Technologies Used
* HTML version 5
* CSS version 3
* JavaScript version ECMAScript 2018
* ReactJS version 17.0.2

## Features
List of features ready:
* Employees and Finance managers are able to log in.
* Employees are able to sign up.
* Finance managers and Employees dashboards that show reimbursements list and have a navigation bar with current user control and reimbursement control systems.
* Employees are able to submit requests for reimbursement thru a special reimbursement form that gives the ability to attach receipts to it.
* Finance managers are able to "Approve" or "Deny" reimbursement requests and add users into the system.
* Finance managers and Employees can edit their personal information inside the system.
* All changes in user personal information are mailed to the user's email.

## Getting Started
1. Make sure do download and install [back-end](https://github.com/maustrauk/revature-ERS).
2. To upload this project you need to clone this repository using `git clone https://github.com/maustrauk/revature-project-ERS-fe.git`.
3. Add project to your IDE.
4. In your IDE run `npm i` command.
5. Add `.env` file to project root folder. It should include [EmailJS App](https://www.emailjs.com/) credentials:

```
REACT_APP_USER_ID={EmailJS user id}
REACT_APP_ACCESS_TOKEN={EmailJS access token}
REACT_APP_SERVICE_ID={EmailJS service id}
REACT_APP_TEMPLATE_ID_1={EmailJS template id #1}
REACT_APP_TEMPLATE_ID_2={EmailJS template id #2}
```
6. In your IDE run `npm start` command.

## Usage
After launching this application you should see on `localhost:3000`:\
![Application welcome screen screenshot](/screen_shot_1.jpg?raw=true)


## License
MIT License
