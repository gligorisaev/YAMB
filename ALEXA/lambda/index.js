const Alexa = require('ask-sdk-core');

// Radio station URLs - Add your favorite radio stations here
const RADIO_STATIONS = {
    'naxi radio': {
        name: 'Naxi Radio',
        url: 'https://naxi128.streaming.rs:9150/'
    },
    'naxi ex yu': {
        name: 'Naxi Ex Yu Radio',
        url: 'https://naxiexyu128.streaming.rs:9150/'
    },
    'antenne düsseldorf': {
        name: 'Antenne Düsseldorf',
        url: 'https://addrad.io/4WRGZP'
    }
    // Add more stations here
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to Radio Player. You can ask me to play a radio station like Naxi Radio, Naxi Ex Yu, or Antenne Düsseldorf. Which station would you like to listen to?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const PlayRadioIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayRadioIntent';
    },
    handle(handlerInput) {
        const stationSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'station');
        const stationKey = stationSlot ? stationSlot.toLowerCase() : null;
        
        const station = RADIO_STATIONS[stationKey];
        
        if (!station) {
            const speakOutput = `I couldn't find ${stationSlot}. Available stations are: ${Object.values(RADIO_STATIONS).map(s => s.name).join(', ')}. Which one would you like?`;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('Which radio station would you like to play?')
                .getResponse();
        }

        const speakOutput = `Playing ${station.name}`;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective(
                'REPLACE_ALL',
                station.url,
                station.url,
                0,
                null
            )
            .getResponse();
    }
};

const ListStationsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListStationsIntent';
    },
    handle(handlerInput) {
        const stationList = Object.values(RADIO_STATIONS).map(s => s.name).join(', ');
        const speakOutput = `Available radio stations are: ${stationList}. Which one would you like to play?`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Which station would you like to play?')
            .getResponse();
    }
};

const PauseIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

const ResumeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ResumeIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Resuming playback';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective(
                'REPLACE_ALL',
                // You might want to store the last played station in session attributes
                Object.values(RADIO_STATIONS)[0].url,
                Object.values(RADIO_STATIONS)[0].url,
                0,
                null
            )
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can ask me to play a radio station by saying, play Naxi Radio, or ask for a list of available stations.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PlayRadioIntentHandler,
        ListStationsIntentHandler,
        PauseIntentHandler,
        ResumeIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
