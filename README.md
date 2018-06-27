# Technical Assessment
NOTE: If you are unfamiliar with the node.js ecosystem and don't feel this would be a fair assessment please reach out and we can provide an alternate problem.
## Overview
Please complete this exercise with node.js and TypeScript or JavaScript.  This exercise is intended to take no longer than 4 hours.  Please limit the detail of your solution with that time in mind.  Also, please include any questions, assumptions, plans or future considerations by providing a README with your submission.

For example, 
```
Do the endpoints need to be secured?  I assumed not for this exercise but would suggest adding authorization in the future.
```
## Problem
Assume that NS8 has contracted you to build a small RESTful API to support their new user tracking software.  There are many node.js frameworks that could help you with this.  For example, express, restify etc.  
The API should support the following endpoints
1. `POST /users` to create a new user record
1. `POST /users/{id}/events` to record a new user event record
1. `GET /users/events`

Persist data in-memory.  Data does not need to be persisted between server restarts. 
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
 
## Endpoint definitions
An HTTP POST to `/users` with the following json
```json
{
  "email": "test@ns8.com",
  "password": "passwordIsPizza",
  "phone": "333-222-1111"
}
```
will create a user.
___
An HTTP POST to `/users/{id}/events` with the following json
```json
{
  "type": "LOGIN"
}
```
will produce a user event with the type "LOGIN".  
The {id} would be the id of a previously created user.

___
An HTTP GET to `/users/events` will always return a json array of event data.  The event data returned should at least have the following elements
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
The following use cases should be satisfied
- return all events for all users
- return all events for a single user
- return all events for the last day

## Submission
Choose one of the following
- provide a public repository where we can view/download your solution
- zip all files and email them

