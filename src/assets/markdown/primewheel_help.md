## :question:__Prime Wheel Effect Help__:question:
```
primewheel start|stop|reset|list|add|remove|color
```

- __start:__  Starts the effect.
- __stop:__  Stops running the effect.
- __reset:__  Reset the effect to start.
- __list:__  List available wheels by index.
- __add:__  Add a new wheel.  Accepts the following parameters:
    - *color=* The color of the new wheel.  Accepts RGB, HSL or HEX values.
    - *spacing=* Spacing between the wheel.  Higher value the closer the spacing.
    - *durration=* Durration to run the wheel in seconds.
    - *offset=* Use random offset (true or false).
<p>Example:</p>
```
primewheel add color=#ffff00 durration=5 offset=false
```
- __remove:__  Remove a wheel by index.
<p>Example:</p>
```
primewheel remove 1
```
- __color:__  Change a wheel color by index.
<p>Example:</p>
```
primewheel color 1 rgb(255, 255, 0)
```

To see the source for the Prime Wheel, enter:
```
showcode
```
