const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {

    it('it should generate correct message', () => {
        let text = 'This is a test';
        let from = 'someTest';
        let message = generateMessage(from, text);

        expect(typeof(message.createdAt)).toBe('object');
        // expect(message.createdAt).toBeTruthy();
        expect(message).toMatchObject({from, text});

    });
});