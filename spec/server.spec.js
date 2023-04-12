const axios = require('axios');
const serverRoute = axios.get('http://localhost:3000/api/message',)
const userMessagesRoute = axios.get('http://localhost:3000/api/message/mom',)

describe('GET path', () => {
	it('should be the server path', (done) => {
		serverRoute
			.then(response => {
				expect(response.config.url).toBe('http://localhost:3000/api/message');
				done();
			})
			.catch(error => {
				done.fail(error);
			});
	});
});

describe('GET Status', () => {
  it('should return 200 OK', (done) => {
    serverRoute
      .then(response => {
        expect(response.status).toBe(200);
        done();
      })
      .catch(error => {
        done.fail(error);
      });
  });
});

describe('GET messages length of "mom"', () => {
	it('should be more or equal than 0, length of messages of the "mom" user ', (done) => {
		userMessagesRoute
			.then(response => {
				expect(response.data[0].name).toEqual('mom');
				done();
			})
			.catch(error => {
				done.fail(error);
			});
	});
});