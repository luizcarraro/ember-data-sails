import Ember from 'ember';
import { module, test } from 'qunit';
import { initialize } from 'ember-data-sails/initializers/ember-data-sails';

var container, application;

module('EmberDataSailsInitializer', {
  setup: function () {
    Ember.run(function () {
      container = new Ember.Container();
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});


test('it setups injections of the socket service', function (assert) {
  initialize(container, application);

  var cont = application.__registry__;
  
  assert.deepEqual(cont._typeInjections.controller.pop(), {
    property: 'sailsSocket',
    fullName: 'service:sailsSocket'
  }, 'the service should have injection setup on all controllers');
  assert.deepEqual(cont._typeInjections.adapter.pop(), {
    fullName: 'service:sailsSocket',
    property: 'sailsSocket'
  }, 'the service should have injection setup on all adapters');
  assert.deepEqual(cont._typeInjections.route.pop(), {
    fullName: 'service:sailsSocket',
    property: 'sailsSocket'
  }, 'the service should have injection setup on all routes');
});

