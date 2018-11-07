# Technical Assessment
NOTE: We are very open to new technologies as we mature and grow, but we have chosen TypeScript as our language for our back end.  The majority of the work for this position will initially be using TypeScript.
## Overview
Please complete this exercise with node.js and TypeScript.  This exercise is intended to take no longer than 4 hours.  Please limit the detail of your solution with that time in mind.  Also, please include any questions, assumptions, plans or future considerations by providing a README with your submission.

For example, 
```
Do the endpoints need to be secured?  I assumed not for this exercise but would suggest adding authorization in the future.
```
## Problem
Assume that NS8 has contracted you to build a small **RESTful API** to support their new user tracking software.  There are many node.js frameworks that could help you with this.  For example, express, restify etc.  

Data does not need to be persisted between server restarts. 

## Data definition

### User
- email
  - string
  - This field is required to create a new user
  - The system must only allow 1 user per unique email address
- password
  - string
  - This field is required to create a new user
- phone number 
  - string
  - This field is optional
  - When provided, the phone number must follow this pattern ###-###-####
### Event
- type
  - This field is required to create a new event
  - The value can be any non-empty string
 
## Data examples

The following input json would create a user
```json
{
  "email": "test@ns8.com",
  "password": "passwordIsPizza",
  "phone": "333-222-1111"
}
```
___
The following input json would create an event with the type LOGIN
```json
{
  "type": "LOGIN"
}
```
___

The following use cases should be satisfied to get user event data
- return all events for all users
- return all events for a single user
- return all events for the last day

The json data returned should at least have the following elements
```json
[
  {
    "type": "LOGIN",
    "created: 47239847298347
  }
]
```
where `created` is the date the event was created.  Choose any date format. 
___

## Submission
Choose one of the following
- provide a public repository where we can view/download your solution
- zip all files and email them

