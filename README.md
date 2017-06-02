# navsys - Manager

**navsys** is a thesis project, which aims to provide an indoor navigation solution with audiovisual feedback, 
using a combination of smartphone based WiFi positioning and physical navigation units. 
For a documentation of the whole project see [navsys-docs](https://github.com/yedlosh/navsys-docs) repository.

## Manager

navsys-manager is a simple web application written in React, created for purpose of easy administration of navsys platform.

### Installation

The server is set up as an npm package. Simply install all dependencies with
```bash
$ npm install
```

### Configuration
Configuration should be provided using [.env](https://github.com/motdotla/dotenv) file.
It's structure should be as follows:
```
#The address where the instance of navsys-backend is running
API_URL=192.168.1.123:3000
```

### Running
To start using webpack-dev-server use start script:
```bash
$ npm run start
```
To build, use:
```bash
$ npm run build
```
