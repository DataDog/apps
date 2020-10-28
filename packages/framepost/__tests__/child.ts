import { ChildClient } from '../src';

test('Instantiates without error', () => {
    const client = new ChildClient();

    expect(client).toBeInstanceOf(ChildClient);
});
