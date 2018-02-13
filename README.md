**Movies**

**About**

Movies manager app, using MongoDB as database, hosted by MLab (formerly MongoLab), 
alternatively you can use a Docker container to host your data.

App is externally configured using a .env file and config folder. 

**Installation**
* Install Node (latest version recommended)
* Install Docker (if you want to use a Docker container for MongoDB)
* Clone this repo (`git clone https://github.com/jemliF/movies.git`)
* Open project folder and install dependencies (`npm install`)
* Install globally (using `npm i -g `) some additional modules like _gulp, nodemon, jasmine-node, pm2, jsdoc_. 

**Build**

I am using Gulp to build the frontend (client folder), so you need to first start Gulp using 
this command `npm run gulp`.

**Run**

If you want to host MongoDb inside of a Docker container, use this command: `npm run docker`

* _Dev mode_ (using Nodemon for code modification detection): `npm run dev`
* _Prod mode_ (using pm2: monitoring, fault tolerance, etc): `npm run prod`

For testing purpose, you can use this command: `npm run test`


