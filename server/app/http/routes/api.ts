import {Router} from '@ahrakio/witty-core';

// unit tests for http request.Method getter.
Router.get('httpMethod', 'httpRequestTester@httpMethod');
Router.post('httpMethod', 'httpRequestTester@httpMethod');
Router.delete('httpMethod', 'httpRequestTester@httpMethod');
Router.put('httpMethod', 'httpRequestTester@httpMethod');
Router.connect('httpMethod', 'httpRequestTester@httpMethod');
Router.head('httpMethod', 'httpRequestTester@httpMethod');
Router.options('httpMethod', 'httpRequestTester@httpMethod');
Router.patch('httpMethod', 'httpRequestTester@httpMethod');
Router.trace('httpMethod', 'httpRequestTester@httpMethod');
//------------

// unit tests for http request.Body getters.
Router.post('httpBody', 'httpRequestTester@httpBody');
Router.post('httpPromiseBody', {target:'httpRequestTester@httpPromiseBody', waitToBody:false});
Router.post('httpStreamBody', {target:'httpRequestTester@httpStreamBody', waitToBody:false});




