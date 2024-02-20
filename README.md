# Pomodoro Timer
This project was an opportunity to work with React + Typescript to create a working application.

# Function
This timer uses the 'pomodoro' method in task timing, using 25-minute intervals for work with 5-minute and 15-minute break periods. This is a preliminary version of the application, and provides only the basic function such as a built-in task list, settings for each individual task, and state management for the timer. This is a version 1 of the application, and I plan to revisit this to both clean my code and add more features.

# Planned updates
- Sounds
- More animations, smoother animations
- Customizable color templates
- Using a task prompt component instead of a prompt object
- Task completion animation
- Automatic pomodoro cycles
- Timer in browser tab?
- Change 'i' icon to pencil icon to indicate edit

# Tech stack
For this project I created a React application using Vite.js, a lightweight local development server. I opted out of initially using CSS libraries for this project.

# Challenges and Conclusions
An initial challenge for this project was the creation of the actual timer component. There is no easy way to have React keep track of a timer relative to an action being taken (such as the time the 'play' button is pressed), so by digging around online I was able to look at the solutions of others in order to build my own. I keep track of both a 'minutes' and 'seconds' variable, and decrement using a useEffect hook to update each second. The seconds variable will decrease, and every 60s so too will the minute variable. I created a stopping point once the minutes variable reached '00' so the timer did not continue into the negative or reset itself.

Once the timer had functionality, the next biggest challenge was the options for each individual Task component. Initially I had wanted to create a TaskOptions component--you can see the file still in the src/ directory--which would be rendered in place of the tasklist-container given the value of a state variable, however on my first run I could not identify a clean method to implement this. I had too many issues attempting to pass the values of the current Task given I could not pass the Task itself. I'm sure there is an elegant solution to the problem sitting in front of my face, but some time away from the issue will do me good to help solve it in the future.

I will be experimenting with React and CSS libraries moving forward, to increase the ease of development, but this project was an excellent learning experience to create something both useful and tangible. I will be hosting this project on my portfolio website at http://portfolioby.cam/ shortly.

# Additionally
If you have any insights on how I can improve this project or my coding practices, please reach out to let me know! I appreciate being told when I am wrong as long as I'm also given direction to move forward. Thank you!

# Known Issues - To Be Fixed
- Addition of blank or 'null' tasks
- Tasks with the same name are all affected when edited or removed from the list.

