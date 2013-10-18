reciclopedia.ro
===============

Harta punctelor de reciclare la care oricine poate contribui
### What's this? ###

[reciclopedia.ro](http://reciclopedia.ro/) is a map of recycling points to which anyone can contribute.

![reciclopedia.ro screenshot](https://raw.github.com/g4b1nagy/reciclopedia.ro/master/screenshot.png)

Based on Google Maps, it provides a simple interface that allows users to look for and add recycling points to a map. This will hopefully encourage more people to recycle by making it less of a pain in the a*s to find a place to take your excess plastic or paper to :)

### Getting your hands dirty ###

The app requires Ruby 1.9.3 on Rails 3.1.0.  
If you are using [RVM](https://rvm.io/) or any similar env managers, fret not, for a ".ruby-version" file is provided for your convenience.

* cd to a comfy location
* git clone git@github.com:g4b1nagy/reciclopedia.ro.git
* cd reciclopedia.ro/
* cp config/database.yml.example config/database.yml
* bundle install
* rake db:migrate
* rake db:fixtures:load
* rails server

### Feeling generous? ###

Contributions are more than welcome and are generally rewarded with a huge THANK YOU! and a [virtual] hug. Feel free to tackle any of the [issues](https://github.com/g4b1nagy/reciclopedia.ro/issues) and send me a pull request afterwards.  
If you have bigger plans, feel free to drop me a line at gabi@usetogether.com.
