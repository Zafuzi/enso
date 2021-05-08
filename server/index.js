import { Meteor } from 'meteor/meteor';

var SECRET = "poop";

var log = console.log;

import './api/index';

if( Meteor.isClient ) { import '../client/local.js'; }

Meteor.startup(function() {

});
