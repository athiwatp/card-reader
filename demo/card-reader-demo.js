'use strict';

let devices = require('../lib/card-reader');

devices.on('device-activated', function (event) {
    console.log(`Device '${event.reader.name}' activated, devices: ${devices.listDevices()}`);
});

devices.on('device-deactivated', function (event) {
    console.log(`Device '${event.reader.name}' deactivated, devices: ${devices.listDevices()}`);
});

devices.on('card-removed', function (event) {
    console.log(`Card removed from '${event.reader.name}' `);
});

devices.on('command-issued', function (event) {
    console.log(`Command '${event.command}' issued to '${event.reader.name}' `);
});

devices.on('response-received', function (event) {
    console.log(`Response '${event.response}' received from '${event.reader.name}' in response to '${event.command}'`);
});

devices.on('error', function (event) {
    console.log(`Error '${event.error}' received`);
});

devices.on('card-inserted', function (event) {

    console.log(`devices: ${devices.listDevices()}`);

    var reader = event.reader;
    console.log(`Card inserted into '${reader.name}' `);

    devices
        .issueCommand(reader, '00A404000E315041592E5359532E4444463031')
        .then(function (response) {
            console.log(`Response '${response.toString('hex')}`);
        }).catch(function (error) {
            console.error(error);
        });
});
