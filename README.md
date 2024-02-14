# Next-Gen-Transport-Solutions

## Purpose of this app

This RESTful app was developped to enable carriers to create and advertise their routes to anybody having transportation needs.

## Carriers
The carriers would be able to update the availability in term of space and weight of their trucks as well as updating their price in real time.
The carriers can also advertise the extra services offered on their route.
So, clients looking for transportation solutions would see those data in real time.
The carrier also have the possibility to supply the clients with a tracking document allowing them to provide their feedbacks upon completion of the shipment.

## Clients
The clients looking for a carrier to meet their transportation needs could find those routes, and see directly the pricing, and available capacity.
The clients would also be able to track their shipments whenever they want, and give their feedback.
Lastly, the clients could create their own request and send it/them to multiple carriers who will decide whether they accept or decline, and set a pricing.

## Feedback
The feedback is displayed on the carrier profile, and can be seen by any clients looking for a route to transport their freight.
It is up to the client to provide their feedbak upon completion of the shipment.

## Support
A Support is also available to answer the inquiries from the users of the platform having an active account.
Note the support login is hidden, meaning that their login must be created directly in the database.

## Mails
To communicate, both carriers and clients will have the possibility to exchange messages through the app.

## Currency Converter - Open Exchange API
The free version of Open Exchange has been used in this API to allow carrier to convert their pricing into the currency of their choice.
https://openexchangerates.org/
https://openexchangerates.org/terms
https://openexchangerates.org/license

## Encryption - bcrypt
To secure the user accounts, hash passwords will be used.
This will be accomplished, and implemented in the backend by the utilization of bcrypt.

## Database - mongoDB
https://www.mongodb.com/
MongoDB Atlas has been the choosen provider to store the documents in the database.
Several collections will serve the purpose of this API.

# RESTful API
This API as been developeed as RESTfull, and the CRUD elements have been used:
Create - POST
Read - GET
Update - PATCH
Delete - DELETE

# Packages used

## Front End
The front end has been developped using React, and Styled-Components for the UI.
The versions of the packages used are listed below:

react": "^18.2.0
react-dom": "^18.2.0
react-router-dom": "^6.22.0
env-cmd": "^10.1.0
styled-components": "^6.1.8
@fortawesome/fontawesome-free": "^6.5.1

## Back End
NodeJS, and Express JS have been used to build the backend that will enable the access of data between the frontEnd and mongoDB.
The versions of the packages used are listed below:

bcrypt": "^5.1.1
dotenv": "^16.4.1
express": "^4.18.2
mongodb": "^6.3.0
morgan": "^1.10.0
uuid": "^9.0.1
nodemon": "^3.0.3

# Background image
The background picture used can be found on https://unsplash.com/
https://unsplash.com/photos/white-trailer-truck-on-road-NKr0qBAkU4s

# Other
Developer notes have been added through the components.

# How to run this API
Download the files.
Create a client (front end) and server (back end) folders on your computer.
npx create-react-app and yarn can be used.
Install the packages listed above for both the front end and the backend. They can be found on https://www.npmjs.com/
Have a mongoDB Atlas account (https://www.mongodb.com/) ready for use (a limited account was free at the time I build this APP).
Open an account on https://openexchangerates.org/ and get a key (a free eky for limited use was available at the time I built this APP.)
Create a .env file to store your MONGO_URI='XXXXXXXXXXX' credentials and REACT_APP_BASE_URL=https://openexchangerates.org/api/latest.json?app_id=TYPE YOUR FREE KEY
Enjoy the App.

#
Capstone project created by Olivier Donze upon completion of the Full-Stack Web Development Bootcamp at Concordia University
https://www.concordiabootcamps.ca/

# License
MIT