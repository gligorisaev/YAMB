# Radio Player Alexa Skill

An Alexa Skill that plays various radio stations.

## Features

- Play different radio stations by voice command
- List available stations
- Pause/Resume playback
- Stop playback

## Setup

### Prerequisites

1. AWS Account
2. Amazon Developer Account
3. ASK CLI (Alexa Skills Kit CLI) installed
4. Node.js installed

### Installation

1. Install dependencies:
```bash
cd lambda
npm install
```

2. Configure your radio stations in `lambda/index.js`:
```javascript
const RADIO_STATIONS = {
    'station-key': {
        name: 'Station Name',
        url: 'http://stream-url.com/stream'
    }
};
```

3. Update the station list in `skill-package/interactionModels/custom/en-US.json` to match your stations.

### Deployment

1. Install ASK CLI:
```bash
npm install -g ask-cli
```

2. Initialize ASK CLI:
```bash
ask configure
```

3. Deploy the skill:
```bash
ask deploy
```

Or deploy manually:
- Create a Lambda function in AWS
- Upload the lambda code
- Create an Alexa Skill in the Developer Console
- Copy the interaction model from skill-package
- Link the Lambda function ARN to your skill

## Usage

Say:
- "Alexa, open radio player"
- "Alexa, ask radio player to play BBC Radio One"
- "Alexa, ask radio player to list stations"
- "Alexa, pause"
- "Alexa, resume"
- "Alexa, stop"

## Customization

### Adding Radio Stations

1. Add your station to the `RADIO_STATIONS` object in `lambda/index.js`
2. Add the station to the `RADIO_STATION` slot type in `skill-package/interactionModels/custom/en-US.json`

### Finding Radio Stream URLs

- Many radio stations publish their stream URLs on their websites
- Look for MP3, AAC, or HLS streams
- Test the URL in a browser or media player before adding

## Project Structure

```
ALEXA/
├── lambda/
│   └── index.js                    # Lambda function code
├── skill-package/
│   ├── interactionModels/
│   │   └── custom/
│   │       └── en-US.json         # Voice interaction model
│   └── skill.json                 # Skill manifest
├── package.json                   # Dependencies
└── README.md                      # This file
```

## Notes

- Make sure your radio stream URLs are publicly accessible
- The skill uses the AudioPlayer interface for streaming
- Stream URLs must be HTTPS for production skills
- Test thoroughly with different stations
