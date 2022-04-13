/**
 * The {@link Post} is the 3rd-party data we're integrating with.
 * The idea is that it represents any data that some 3rd-party provides that is being displayed in the custom widget.
 */
type Post = {
    title: string;
};

/**
 * This function represent the idea of retrieving 3rd-party data.
 * It currently stubs out a couple of posts just to provide something.
 *
 * @param username The {@link User} to find {@link Post}s for.
 * @returns All of the {@link User}'s {@link Post}s.
 */
async function getPosts(username: string): Promise<Post[]> {
    /**
     * Simulate making a request to a 3rd-party that returns the {@link Post}s.
     */
    return new Promise((resolve: (posts: Post[]) => void): void => {
        setTimeout((): void => {
            resolve([
                { title: 'My first post' },
                { title: 'The second post' },
                { title: 'My last post' }
            ]);
        }, 100);
    });
}

export { getPosts };
export type { Post };
