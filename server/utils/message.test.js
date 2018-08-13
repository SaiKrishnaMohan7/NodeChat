const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct location obj', () => {
        let from = 'GetToTheChopper';
        let lat = 1;
        let lng = 2;

        expect(typeof(generateLocationMessage(from, lat, lng))).toBe('object');
        expect(generateLocationMessage(from, lat, lng)).toMatchObject({
            from,
            url: `https://www.google.com/maps?q=${lat},${lng}`
        });
    });
});