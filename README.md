# AustriaSkills-Robot-WebInterface
Web Interface i did for the Austria Skills Robot made by my colleagues.

## Information

No connection to robot:

![image](https://github.com/H0lz3r-x64/AustriaSkills-Robot-WebInterface/assets/91200978/130f6b5d-911b-440b-9a5d-5e48016c9dae)
___
<br><br>

If connection established it draws the robot, the path (toggleable), and display all the received values:

![image](https://github.com/H0lz3r-x64/AustriaSkills-Robot-WebInterface/assets/91200978/aa9e4c14-2c5b-41ef-8dd8-79757f3b383f)
___
<br><br>

Dynamic site with full mobile support.
Example of site displayed on an IPhone XR:

![image](https://github.com/H0lz3r-x64/AustriaSkills-Robot-WebInterface/assets/91200978/711cdf17-a284-4856-be68-548322957a26)
___
<br><br>

## Testing the site
The page can be tested by hosting it via localhost and having the robot simulated using the [AustriaSkills-Robot-ResponseSimulate](https://github.com/H0lz3r-x64/AustriaSkills-Robot-ResponseSimulate) python script.


You have to adjust the `location_endpoint` in the [robot_comms.js](https://github.com/H0lz3r-x64/AustriaSkills-Robot-WebInterface/blob/main/res/scripts/robot_comms.js) file to match the url of your flask developement server.
