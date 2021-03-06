# ez-Dashing

__ez-Dashing__ is customizable free dashboard tool, build with React and Spring Boot, for agile development team.

The project is very young but in active development. All contributions are welcome.

# Demo

- __From script__
```
./ez.sh demo
```
- __From Dock Hub__
```
docker run -p 2222:2222 -p 8080:8080 --name ez-demo -t ylacaute/ez-dashing:latest bash ez.sh demo
```
Go on [http://localhost:2222](http://localhost:2222)

The Docker image allow you to run any command you would have started locally with **ez.sh**.

Check help of **ez.sh** for more options.

# Features
 - __Responsive__ (all supports, also on huge screens with scaling SVG)
 - __Configurable__ (grid, widgets, avatars, metric thresholds...)
 - __Ready to use__ (no plugin system, Docker ready)

# Requirements
 - Node 7
 - Java 8
 - Maven 3
 - or... Docker
 
# Existing widgets
 - __BugsWidget__ (jira) 
 - __ClockWidget__ (current date)
 - __jenkinsMonitoringWidget__ (jenkins health)
 - __SonkinsWidget__ (jenkins + sonar metrics)
 - __SprintWidget__ (Scrum sprint progression)
 - __TeamWidget__ (team name and logo)

# Widgets Backlog
 - __MediaWidget__ (image / video / sound)
 - __PullRequestWidget__ (Gitlab, Github)
 - __TextWidget__ (scrolling text)
 - __GraphWidget__ (using D3 in the React way)
 - __Sonkinswidget__ (weather icon base on last builds)
 
# General Todos
 - Improve overall user configuration
 - __Testing__ ^^'
 - Bash scripts to ease install 
 - Add a Dashing color theme
 - Plugin system
 - Improve error messages (if requests are 404, 403...)
 
# Browser compatibility: 
 - __Chromium 57__ : good
 - __Firefox 52__ : bad
 - __Safari__ : not tested
 - __Internet Explorer__ not tested

# License
 - ez-Dashing is licensed under the [Apache 2 license](/LICENSE).

# Screenshots

![Screenshot](/ez-client/screenshot.png)

![Screenshot](/ez-client/screenshot_resize.png)
