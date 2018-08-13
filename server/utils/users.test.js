const expect = require('expect');

const {
    Users
} = require('./users');



describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
                id: 133,
                name: 'Blehhh',
                room: 'The Room'
            },
            {
                id: 123,
                name: 'Blass',
                room: 'Thecerom'
            }
        ];
    });

    it('should add user', () => {
        let users = new Users();
        let user = {
            id: 133,
            name: 'Blehhh',
            room: 'The Room'
        };

        users.addUser(user);

        expect(users.users).toEqual([user]);
    });

    it('return names for given room', () => {
        let userList = users.getUserList('The Room');

        expect(userList).toEqual(['Blehhh']);
    });
});