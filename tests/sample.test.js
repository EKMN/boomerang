import test from 'ava'

test('arrays are equal', (t) => {
  t.deepEqual([ 1, 2 ], [ 1, 2 ])
})

// request a valid http page but intercept the request with nock and feed in the mock html
// then, valdidate that the scraper output matches the expected test conditions. Do this for several pages.

// nock('https://www.google.com').get('/').replyWithError('something awful happened')
// nock('https://www.google.com').get('/').reply(404)
