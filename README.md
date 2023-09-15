![Frame 1000011531](https://github.com/desmondtong/Project-4/assets/107420497/e9394ca4-7365-49d3-9c49-433240d226f1)

# Burps

Burps is a user-friendly food ordering application that simplifies the process of discovering, selecting, and ordering delicious meals from a wide range of local restaurants. 

With an intuitive interface and a vast selection of culinary options, Burps offers users the convenience of browsing diverse menus, customizing orders, and tracking deliveries in real-time.

This is a final fullstack web application as part of General Assembly's Software Engineering Immersive. 

---
## Data Modelling
<img width="1512" alt="image" src="https://github.com/desmondtong/Food-Ordering-App/assets/107420497/6df445b1-06ef-4a93-b9ea-6b4b0cf18951">

---
## Feature Highlights
<img width="1511" alt="image" src="https://github.com/desmondtong/Project-4/assets/107420497/b6a96702-7da1-4340-9f7f-4951c13afee2">

<img width="1512" alt="image" src="https://github.com/desmondtong/Project-4/assets/107420497/09d57452-bb9c-46b3-b016-83770e708458">

### Customer Portal
### 1) **Burps' Food**
- Explore a wide array of delicious options from nearby restaurants. 
<img width="1501" alt="image" src="https://github.com/desmondtong/Project-4/assets/107420497/ed80e3ce-92eb-45cd-b54b-9aaa3c629c50">
<img width="1493" alt="image" src="https://github.com/desmondtong/Project-4/assets/107420497/cd613c9f-4ad8-41e5-97e2-a2fb12017e5e">

- Effortlessly place orders from your favorite restaurants.
<img width="1493" alt="image" src="https://github.com/desmondtong/Project-4/assets/107420497/75c0072f-6446-46d8-83cc-d4445090ab5f">

### 2) **Food Ordering**
- Seamlessly place orders and check out with ease.
<img width="1507" alt="image" src="https://github.com/desmondtong/Project-4/assets/107420497/2b920969-f162-4cba-8593-b7c3b10ea4a0">
<img width="758" alt="image" src="https://github.com/desmondtong/Project-4/assets/107420497/ef7115ab-9670-4b74-97a4-a29a53db1d54">


### 3) **Order Tracking**
- Receive real-time order updates through non-intrusive snack bar notifications. 
<img width="1497" alt="image" src="https://github.com/desmondtong/Project-4/assets/107420497/9f3b9cc5-5dcd-4959-a019-cc7824d5a70d">

- Monitor your order status in an elegant tracker.
<img width="1510" alt="image" src="https://github.com/desmondtong/Project-4/assets/107420497/7cf1dc6f-2492-4170-a22f-810ddaae8573">

### Vendor Portal
### 1) Menu
- Conveniently add, remove, and update your store's menu items. 
<img width="1497" alt="image" src="https://github.com/desmondtong/Project-4/assets/107420497/ad53e02c-b9b8-47f9-bade-59403103e9f5">

- Easily toggle item availability with a single click.
<img width="584" alt="image" src="https://github.com/desmondtong/Project-4/assets/107420497/4f91cf4a-ae02-44f3-b6c0-e31e04287929">

### 2) Alert
- Receive immediate notifications for incoming orders. Keep customers informed about order status with just a click.
<img width="1510" alt="image" src="https://github.com/desmondtong/Project-4/assets/107420497/dada295b-4283-4a9d-b544-800af202d416">


### 5) Rating & Reviews
- Access all customer feedback in one place.
<img width="1498" alt="image" src="https://github.com/desmondtong/Project-4/assets/107420497/aa8b6f7c-2f1c-4c32-9a81-70f6e7d17ce1">

---
## Languages and Technologies Used

### Front-end
- React
- TypeScript
- CSS
- Material UI

### Back-end
- Express.js
- Database: PostgreSQL
- Driver: Node-progres (pg)
- Image storage: AWS S3

### Others
- Socket.io
- Design system: Material 3
- Data modelling: Draw.io

---
## Setup

### Express Backend
All the backend code is in the Back-end directory. Run all backend commands from inside that directory.

### Setup .env for Backend
Create a new .env file in the back-end directory and add the following lines:
```
PORT=5001
DATABASE=burps
DB_USER=''
HOST=127.0.0.1
PASSWORD=''

#Generate your own secrets 
ACCESS_SECRET=''
REFRESH_SECRET=''

# AWS variables for image 
BUCKET_NAME=''
BUCKET_REGION=''
ACCESS_KEY=''
SECRET_ACCESS_KEY=''
```
Add in your values here. 
- The database has to be for a Postgres database. You may create all the tables using the .sql [here](https://github.com/desmondtong/Project-4/blob/main/Backend/burps.sql)
- Generate your own Access Secret and Refresh Secret
- Add in credentials for your AWS S3 bucket

### Run the app
```
npm i
npm run dev
```

### React Front-end
All the frontend react code is in the Front-end directory. Run all frontend commands from inside that directory.

### Setup .env for Front-end
Create a new .env file in the front-end directory and add the following lines:
```
VITE_SERVER=http://localhost:5001
```

### Run the app
```
npm i
npm run dev
```

---
## Wireframes and technical designs
Check out the [Figma](https://www.figma.com/file/cxrzwdPGh25mIMrTZ5zpox/Project-4---Food-Ordering?type=design&node-id=15-600&mode=design&t=tGKGId4ktI0dEwc2-0) here!

---

## Future development

- Add chatbox to ease communication between customer and vendor
- Add dashboard to vendor portal to populate sales analytics
- Display all order histories for both customer and vendor 
- Customers can add their favourite restaurant to Favourite tab
- Utilize OneMap API to estimate distance time for order deliveries
- Incorporate payment method using Stripe

---
## References

**Backend:**

- [CRUD REST API with Node.js, Express, and PostgreSQL](https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/)

- [Building CRUD REST API with Node.js, Express.js, and PostgreSQL](https://www.atatus.com/blog/building-crud-rest-api-with-node-js-express-js-and-postgresql/#using-node.js-to-connect-to-a-postgres-database)

- [Create a Chat UI in React with MUI 5](https://frontendshape.com/post/create-a-chat-ui-in-react-with-mui-5#google_vignette)

- [Chat UI React Package](https://npm.io/package/chat-ui-react)

- [Socket.IO Tutorial on YouTube](http://socket.io) - [Video](https://www.youtube.com/watch?v=ZpZUpXfVAao&list=PL63c_Ws9ecIRZ6njHRi3cuCkNSfzqyLBn&index=6)

- [TypeScript React Tutorial on YouTube](https://www.youtube.com/watch?v=FJDVKeh7RJI)

- [TypeScript Express Tutorial on YouTube](https://www.youtube.com/watch?v=qy8PxD3alWw)

- [PERN Stack Example on YouTube](https://www.youtube.com/watch?v=ldYcgPKEZC8)

- [Connect TablePlus to ElephantSQL](https://doc.elements-apps.com/elements-connect-cloud/how-to/configure-a-custom-demo-datasource-for-elements-connect)

- [Add CORS Support to Express TypeScript API](https://www.twilio.com/blog/add-cors-support-express-typescript-api)

- [TypeScript Modules Handbook](https://www.typescriptlang.org/docs/handbook/modules.html#:~:text=Each%20module%20can%20optionally%20export,one%20default%20export%20per%20module)

- [No overload matches this call, .env file](https://github.com/nodemailer/nodemailer/issues/1075)

- [Property 'id' does not exist on type 'string'](https://stackoverflow.com/questions/69479595/property-id-does-not-exist-on-type-string-jwtpayload-property-id-does)

- [Building Robust APIs with TypeScript and Express](https://dev.to/wizdomtek/typescript-express-building-robust-apis-with-nodejs-1fln)

- [Change Column Type in PostgreSQL](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-change-column-type/)

- [SQL COUNT, AVG, SUM Functions](https://www.w3schools.com/sql/sql_count_avg_sum.asp)

- [Change Timezone of a PostgreSQL Database](https://www.commandprompt.com/education/how-to-change-the-timezone-of-a-postgres-database/)

- [Using the NOW() Function in PostgreSQL](https://hevodata.com/learn/postgresql-now/#:~:text=You%20can%20use%20the%20PostgreSQL,per%20the%20following%20example%20query)

- [Handling TypeScript Properties in Express Request](https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type-request)

- [Copying Data Between Tables in SQL](https://dataschool.com/learn-sql/copying-data-between-tables/)

- [Express Validator Documentation](https://express-validator.github.io/docs/api/validation-chain/)

- [AWS S3 Tutorial for Storing Images on YouTube](https://www.youtube.com/watch?v=eQAIojcArRY)

- [Sharp Package for Image Processing](https://sharp.pixelplumbing.com/api-resize#resize)

- [Storing Images in S3 from Node Server](https://www.sammeechward.com/storing-images-in-s3-from-node-server)

- [Socket.IO Official Website](http://socket.io)

**TypeScript React:**

- [Using useContext in TypeScript](https://github.com/orgs/community/discussions/42033#)

- [Property 'env' does not exist on type 'ImportMeta'](https://github.com/vitejs/vite/issues/9539)

- [Material-UI Grid Align and Vertical Align](https://smartdevpreneur.com/the-complete-guide-to-material-ui-grid-align-items/#:~:text=Material-UI%20Grid%20Center%20Align%20and%20Vertical%20Align,-<Grid%20container%20direction&text=However%2C%20if%20you%20wanted%20to,flex-end%3A%20vertically%20aligns%20bottom)

- [Material-UI Select Set Value is Always Out of Range](https://stackoverflow.com/questions/60813040/materialui-select-set-value-is-always-out-of-range)

- [Argument of Type 'string | null' is Not Assignable to Parameter of Type 'string'](https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string)

- [TypeScript: 'Cannot Invoke an Object Which is Possibly 'Undefined'](https://bobbyhadz.com/blog/typescript-cannot-invoke-an-object-which-is-possibly-undefined#:~:text=The%20error%20%22Cannot%20invoke%20an,doWork%3F.())

- [Material-UI Button Custom Elevation](https://stackoverflow.com/questions/70597447/material-ui-button-custom-elevation)

- [Format Number to Always Show 2 Decimal Places](https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places)

- [TypeScript: Element Implicitly Has Any Type Expression](https://bobbyhadz.com/blog/typescript-element-implicitly-has-any-type-expression#:~:text=The%20error%20%22Element%20implicitly%20has,one%20of%20the%20object's%20keys)

- [How to Make the Browser Go Back to the Previous Page Using JavaScript](https://www.geeksforgeeks.org/how-to-make-browser-to-go-back-to-previous-page-using-javascript)


---
## Credits
- Special credit to [Ivan Tong](https://www.behance.net/ivantong1?fbclid=PAAaZDZ9fGW5H0rf3B750mvN3W2acqYTYUHGMSaZy_A28J1nqJaZEb2cqd0B0) for designing the wireframes! ❤️


