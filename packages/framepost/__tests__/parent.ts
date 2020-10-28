import { ParentClient } from '../src';

test('Instantiates without error', () => {
    const client = new ParentClient();

    expect(client).toBeInstanceOf(ParentClient);
});
