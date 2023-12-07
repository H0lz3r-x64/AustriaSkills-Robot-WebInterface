<a name="readme-top"></a>
# AustriaSkills-Robot-WebInterface
This project is a web interface for the Austria Skills Robot, a robot that was designed and built by my colleagues for the Austria Skills competition. The web interface allows you to monitor and control the robot remotely using a web browser.

## Features

- The web interface can connect to the robot via http and exchange data in JSON format.
- The web interface can display the robot's position, orientation, speed, battery level, and other sensor data in real time.
- The web interface can also show the robot's path on a canvas, which can be turned on or off by clicking a button.
- The web interface is responsive and adaptive to different screen sizes and devices. It works well on both desktop and mobile browsers.

## Screenshots

Here are some screenshots of the web interface in action:

- This is how the web interface looks when there is no connection to the robot:

![image](https://github.com/H0lz3r-x64/AustriaSkills-Robot-WebInterface/assets/91200978/130f6b5d-911b-440b-9a5d-5e48016c9dae)

- This is how the web interface looks when the connection is established and the robot is moving:

![image](https://github.com/H0lz3r-x64/AustriaSkills-Robot-WebInterface/assets/91200978/aa9e4c14-2c5b-41ef-8dd8-79757f3b383f)

- This is how the web interface looks on an iPhone XR:

![image](https://github.com/H0lz3r-x64/AustriaSkills-Robot-WebInterface/assets/91200978/711cdf17-a284-4856-be68-548322957a26)

<p align="right"><a href="#readme-top">▲</a></p>

## How to run

To run the web interface, you need to do the following steps:

- Clone this repository to your local machine.
- Either localhost it or put it on a different machine with a webserver.
- Open your web browser and go to your localhost url or the other machines url.
- To simulate the robot, you can use the [AustriaSkills-Robot-ResponseSimulate](https://github.com/H0lz3r-x64/AustriaSkills-Robot-ResponseSimulate) python script, which will host a flask development server and  send fake data to the web interface.
- Make sure to change the `location_endpoint` variable in the [robot_comms.js](https://github.com/H0lz3r-x64/AustriaSkills-Robot-WebInterface/blob/main/res/scripts/robot_comms.js) file to match the URL of your flask development server that runs the python script.


