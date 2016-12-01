# CodeOff

Online Coding Challenge battleground featuring multiple testing sequences, powerups, and spectator viewing!

## Team

  - __Product Owner__: Guy Thomas
  - __Scrum Master__: Sherman Chen
  - __Development Team Members__: Guy Thomas, Jessie Mavi, Robbie Gifford, Sherman Chen

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
    1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

You can elect to signup for an account, or for even faster play just click "play now" from the homepage and then select either solo or battle (for multiplayer!). For viewing just select "view lobby" from the homepage and select a room to watch real time competitions in progress!

## Requirements

- Node ^6.0.0
- MongoDB ^3.2
- Socket.io

## Development

- Webpack
- Babel
- Socket.io-client

### Installing Dependencies

From within the root directory:

```sh
npm install (sudo if necessary)
npm run build
npm run start

If encountering any issues when building consider:
	editing config file (main.js) with own keys
	populating database with seed data by changing directions to /src/db and running node mock.js
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
