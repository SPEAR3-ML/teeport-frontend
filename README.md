# Teeport frontend service

Teeport is an optimization platform that aims to solve the communication problems between the optimizers and the evaluators in real life. Read more about Teeport [here](https://teeport.ml/intro/) and [here](https://teeport-client-python.readthedocs.io/en/latest/).

This is the frontend part of the Teeport service, it's optional but provides nice addition features such as optimization monitoring, benchmarking and comparision. It requires the [Teeport backend service](https://github.com/SPEAR3-ML/teeport-backend) to be running somewhere that is visible to the host of the Teeport frontend service to work. 

## Prerequisites

- [Node.js](https://nodejs.org/en/) 12+

## Run the service

First clone this repository to your computer:

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

```bash
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

```bash
MODE=local
BASENAME=/
PORT=3000
```

We assume that you just want to test the service. Even though it's OK to run the service this way in a production environment, we recommend you read the `Deployment` section if you want to run and use the Teeport frontend service seriously.

Let's run the service:

```bash
npm run serve
```

To verify if the frontend service has been built and run successfully, open your favorite browser and go to [http://localhost:3000](http://localhost:3000). You should be able to land on a page titled Teeport. You can then play with it as demonstrated in [teeport-test](https://github.com/SPEAR3-ML/teeport-test#run-the-gui-test-notebooks-in-jupyter-lab).

## Deployment

**WIP**
