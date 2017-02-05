[roomba]: http://cameldridge.com/experiment/roomba/index.html
[Game Engine]: https://github.com/OinkIguana/game-engine

# roomba

A simple Roomba that wanders the big wide world.

Watch the Roomba in action [here][roomba].

## Running

To run the Roomba yourself, you will need to have link up my [Game Engine] to NPM,
and then link that with the Roomba package:

```
git clone git@github.com:oinkiguana/game-engine.git
cd game-engine
npm link
cd ../
git clone git@github.com:oinkiguana/roomba.git
cd roomba
npm link game-engine
npm install --only=dev
webpack
npm start
```
