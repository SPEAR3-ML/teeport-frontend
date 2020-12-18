# Teeport frontend service

Teeport is an optimization platform that aims to solve the communication problems between the optimizers and the evaluators in real life. Read more about Teeport [here](https://teeport.ml/intro/) and [here](https://teeport-client-python.readthedocs.io/en/latest/).

To get the big picture of how Teeport works technically, please take a look at [this Teeport tutorial](https://github.com/SPEAR3-ML/teeport-test).

This is the frontend part of the Teeport service, it's optional but provides nice addition features such as optimization monitoring, benchmarking and comparision. It requires the [Teeport backend service](https://github.com/SPEAR3-ML/teeport-backend) to be running somewhere that is visible to the host of the Teeport frontend service to work. 

To run the service, you can either run it directly (within a Node.js environment, follow the [Run the service directly](#run-the-service-directly) section) or run it in docker (follow the [Run the service in docker](#run-the-service-in-docker) section). You don't have to go through both, just choose one path that fits your needs (I recommend you go with the docker way if docker is available in your case).

## Run the service directly

### Prerequisites

- [Node.js](https://nodejs.org/en/) 12+

### Clone the repo

```bash
git clone https://github.com/SPEAR3-ML/teeport-frontend.git
```

### Build the web app

In the terminal, go to the root of the project and install the dependences:

```bash
cd teeport-frontend
npm install
```

Now create a configuration file named `.env` with the content below:

```
REACT_APP_URI_TASK_SERVER=ws://localhost:8080
REACT_APP_BASENAME=/
```

Where `REACT_APP_URI_TASK_SERVER` is the uri of the Teeport backend service, here we assume that you have the Teeport backend service running locally at port `8080`.

Then build the web app:

```bash
npm run build:lan
```

This will create a `build` folder that contains the web app files under the project root.

### Serve the web app

Now `cd` to the `server` folder under the project root and install the dependences:

```bash
cd server
npm install
```

Create a configuration file named `.env` with the content below:

```
MODE=local
BASENAME=/
PORT=3000
```

After that the project file structure should look like:

```
|--teeport-frontend
    |--server
        |--.env
        |--...
    |--.env
    |--...
```

We assume that you just want to test the service. Even though it's OK to run the service this way in a production environment, we recommend you read the `Deployment` section if you want to run and use the Teeport frontend service seriously.

Let's run the service:

```bash
npm run serve
```

To verify if the frontend service has been built and run successfully, open your favorite browser and go to [http://localhost:3000/tasks](http://localhost:3000/tasks). You should be able to land on a page titled Teeport. You can then play with it as demonstrated in [teeport-test](https://github.com/SPEAR3-ML/teeport-test#run-the-gui-test-notebooks-in-jupyter-lab).

### Stop the service

Just hit `ctrl + c` in the terminal in which you run the service to terminate it.

## Run the service in docker

### Clone the repo

```bash
git clone https://github.com/SPEAR3-ML/teeport-frontend.git
```

### Build the docker image

Go to the project directory:

```bash
cd teeport-frontend
```

Create a file named `.env` with the content below:

```
REACT_APP_URI_TASK_SERVER=ws://{IP}:8080
REACT_APP_BASENAME=/
```

Where `{IP}` should be replaced by the LAN IP of the Teeport backend service you just setup, typically something like `10.0.0.172`. You can check it with `ifconfig` on Mac/Linux or `ipconfig` on Windows.

Then in the subdir `server`, create a file named `.env` with the content below:

```
MODE=production
BASENAME=/
PORT=3000
```

After that the project file structure should look like:

```
|--teeport-frontend
    |--server
        |--.env
        |--...
    |--.env
    |--...
```

We'll use the `Dockerfile.lan` and the corresponding `Dockerfile.lan.dockerignore` to build the image, in order to do that we'll need docker 19.03 or higher, to be able to use the dockerignore file other than the default one.

Make sure you're using docker 19.03 or higher, let's enable the BuildKit mode.

If you're using bash-like terminal, run this:

```bash
export DOCKER_BUILDKIT=1
```

Else if you're using powershell:

```powershell
$Env:DOCKER_BUILDKIT = 1
```

or you're on Windows cmd:

```cmd
set DOCKER_BUILDKIT=1
```

Then build the docker image:

```bash
docker build -f Dockerfile.lan -t teeport/frontend .
```

### Run the docker image

```bash
docker run -d -p 3000:3000 --name teeport-frontend --restart always teeport/frontend
```

To verify if the frontend service docker is working correctly, open your favorite browser and go to [http://localhost:3000/tasks](http://localhost:3000/tasks). You should be able to land on a page titled Teeport. You can then play with it as demonstrated in [teeport-test](https://github.com/SPEAR3-ML/teeport-test#run-the-gui-test-notebooks-in-jupyter-lab).

### Stop the docker image

```bash
docker stop teeport-frontend
```

You can restart a stopped docker image anytime by running:

```bash
docker start teeport-frontend
```

## Deployment

**WIP**
