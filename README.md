# React-Node Task

The codes are uploaded in server to view output. 
URL : [http://server.ditinex.online:3000](http://server.ditinex.online:3000)

Test account with dummy suggestion products added in database :
Email : asifakramsk@gmail.com
Password : password

Test account with no suggestion data :
Email : test@test.com
Password : 1234

## Front-end Approach :

>> Assets folder contains all images, css files etc. Responsive design made with pure CSS, no library like bootstrap were used.

>> Components folder contains reusable components. For example : the design layout of product list.

>> Containers contains folder for each page such as home,about us, contact us etc. Each folder for pages will contain main component as well as sub components. As the code size is small, I have added all codes in same file.

>> Redux folder is used for redux state management. Redux is used to store user data globally after login. Based on the user's login and logout session, the navigation menu changes.

>> Api folder contains the axios requests to node api to fetch data from database.

>> List of products will be shown to all logged in as well as logged out users. List of suggestions under list of products will be shown to only logged in users.


## Back-end Approach :

>> router.js is used to route the api requests to different controllers.
>> Controller folder contains the controllers for each api request.
>> Model folder contains models and schema for both the database. Controller imports the models for further use.
>> Config.js contains all the configurations
