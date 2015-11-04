# BUILD_Admin

## Build and Install 
###Prerequisites
- install [GIT](https://git-scm.com/downloads)
- install [npm.js](https://docs.npmjs.com/cli/install) - _*only version 1.4.28 is supported*_
- install [node.js](https://docs.npmjs.com/cli/install) -_*versions 10.33 and 10.38 are supported*_
- install [mongodb](https://www.mongodb.org/downloads#previous) -_*only version 2.6.x is supported*_
- Follow install for your OS @ https://github.com/TooTallNate/node-gyp/blob/master/README.md#installation


###Download / Clone

1. Clone [Admin](https://github.com/sapbuild/Admin) repo
    ```sh
    git clone https://github.com/sapbuild/Admin.git
    ```

2. Install required node modules (dependencies):
    ```sh 
    npm install -g grunt-cli
    cd Admin
    sudo npm install
    ```
    
3. Initialize the database(Required just the first time if not already done by BUILD):
   ```sh
    cd server
    node initSchema.js
    node setDefaultAccess.js
    cd ..
   ```
   
4. Start the BUILD application (for Dev):
    ```sh
     grunt serve
    ```

Go to [http://localhost:9001](http://localhost:9001) in Chrome browser and click Join

###Debugging the Node.js backend
Starting BUILD Admin with "grunt serve" will start the debug server on the default port 5858. You can connect to this debugger session with tools like Webstorm or node-inspector. The easiest and fastest way to debug the Node.js backend is to use node-inspector. 
You can install node-inspector globally via:
```sh
npm install -g node-inspector
```
and connect then to the running server via
```sh
node-inspector --no-preload
```
The option --no-preload will speed up the initiliziation dramatically as it doesn't preload all source files, but loads them when neccessary.


## Create a user with the Admin role
Please note that the Admin role is ONLY needed for BusinessCatalogManager and is not needed to access the Admin UI:

  1 - Go to Admin\server
  
  2 - Script for admin creation : node createAdmin.js --name <admin name> --password <admin password>  --email <admin email>
  
  Note: this script creates a user with a Standard and an Admin roles.

#### Opt-out
To manage the emails blacklist, you can use the optout-script.js in server/. The first argument is the action you want to perform (add or remove) and all the following arguments will be email addresses.

`` node optout-script.js  add|remove email1 email2 ... emailn``

##### Examples

`` node optout-script.js  add bob@sap.com dave@sap.com`` 
Will add bob@sap.com and dave@sap.com to the blacklist.

`` node optout-script.js  remove bob@sap.com``
Will remove bob@sap.com from the blacklist.

### The following happens when a user is removed via the admin console
- Remove the projects owned by this user from projects collection,
- Remove the user from project user list (remove from participant list)
- Remove the studies belonging to the deleted project from studies collection,
- Remove answers and annotations made by the user in studies he participated in
- Remove user + deleted projects from roles collection
- Remove user from users collection


# BUILD on GitHub

[Click here](https://github.com/SAP/BUILD) to visit the central BUILD project on GitHub, where you can find out more!

[Click here](https://github.com/SAP/BUILD/blob/master/Contributing.md) to view the BUILD Contribution Guidelines. 

