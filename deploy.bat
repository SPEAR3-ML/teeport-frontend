:: this script deploy the teeport frontend to the target machine
ECHO OFF
CLS

:: deploy settings
SET target=lambda-sp3
SET username=zhezhang
SET image_name=teeport/frontend
SET name=teeport-frontend
SET version=0.2.0
SET port=3001

:: build the production webpages
rem npm run build:lambda

:: build and save the docker image to the disk
docker build -t %image_name%:%version% .
docker save -o D:/Playground/%name%.tar %image_name%:%version%

:: scp the docker image to the target machine
scp D:/Playground/%name%.tar %username%@%target%:/home/%username%/

:: load and run the docker image on the target machine
ssh %username%@%target% bash -c "'docker load -i /home/%username%/%name%.tar && docker tag %image_name%:%version% %image_name%:latest && docker rm -f %name% 2> /dev/null ; docker run -d -p %port%:3000 --name %name% --restart always %image_name%'"
