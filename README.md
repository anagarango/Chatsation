## Description
Chatsation is a "chat app", but so far, it only works having two browsers under the same localhost link and the "conversation" happens live with yourself. This was honestly just to try out Socket.io.
</br>
But it still works in your local machine as long as you follow the instructions below!


## Getting Started

1. 
```bash
npm i
```

2. Create a ".env.local" file on the main directory of the project.

3. Make sure you have created a [MongoDB](https://cloud.mongodb.com/) account and create a new database and follow the steps. REMEMBER THE PASSWORD YOU CREATE FOR THE USER!

4. Press the "Connect" button to conenct the cluster to the app, and click on "VS Code" under "Access your data through tools".

5. Follow instrictions and paste link inside the ".env.local" file in the project after the key name "DB_USER".</br>
Example of what the link given to me would look like pasted into the file:
```env
DB_USER=mongodb+srv://anitagarango:<password>@cluster0.qjsaitf.mongodb.net/test
```
and replace <password> with the password you created for the user in the process of Step 3

6.
```bash
npm run dev
```


## Programming Technologies Used
* Next.js 13
* Node.js (Express.js)
* MongoDB
* Socket.io
* Jasmine
* Axios

## Screenshots
![Screenshot 2023-04-15 at 17 30 34](https://user-images.githubusercontent.com/91710569/232259939-46aa8035-7365-4c42-a6f4-684fb0454718.jpg)
![Screenshot 2023-04-15 at 17 30 46](https://user-images.githubusercontent.com/91710569/232259943-4aae8a52-36a6-4575-90bf-879986c37e9a.jpg)
