# TeslaTakeHome
Tesla take-home challenge by Amit Rajesh

This application allows you to move a series of colorful icons across a map,
view/change the icon configuration settings by double-clicking (which utilizes a local internal databse), and view sample real-time data being received by that icon using Websockets.


# Running:

To begin, clone this repository to a local directory and navigate to this directory on some terminal.

## Using Docker:
First, make sure docker is installed on your computer. Then run (from root directory):  
> docker build -f Dockerfile.combined -t "name of Docker image" .   
> docker run --rm -p 5000:5000 "name of Docker image"  

Go to localhost:5000 to see the full application.

## Without Docker 
Make sure npm and pip are installed on your computer. Then, go to the react-app directory and run:
>npm install  
>npm start

In a sperate terminal, navigate to the flask directory and run:  
>pip install -r requirements.txt  
>flask run

Visit localhost:3000 to see the full application.

# Controls
Double-click on an icon to see its configuration, including the node ID, node name, and its X and Y coordinate on the map. You can directly alter the ID and name by changing the textfield and pressing the Change Info button. When dragging the icon to a new location, the X and Y coordinates will automatically adjust. 

Click the popdown button near the bottom of the configuration to reveal sample real-time streaming data being sent to that icon.


Hope you enjoy!

-- Amit Rajesh





