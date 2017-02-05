[demo]: http://cameldridge.com/experiment/robot-vacuum/index.html
[Game Engine]: https://github.com/OinkIguana/game-engine

# Robot Vacuum

A simple Robot Vacuum that wanders the big wide world.

Watch the Robot Vacuum in action [here][demo].

## Running

To run the Robot Vacuum yourself, you will need to have link up my [Game Engine] to NPM,
and then link that with the Robot Vacuum package:

```
git clone git@github.com:oinkiguana/game-engine.git
cd game-engine
npm link
cd ../
git clone git@github.com:oinkiguana/robot-vacuum.git
cd robot-vacuum
npm link game-engine
npm install --only=dev
webpack
npm start
```
