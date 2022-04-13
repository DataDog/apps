import { DDClient } from '@datadog/ui-extensions-sdk';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { getUser, User } from '../3rd-party/user';
import { Post } from '../3rd-party/post';

type SidePanelProps = {
    client: DDClient;
};

/**
 * This component renders the 3rd-party {@link Post} data.
 */
function PostsComponent(props: SidePanelProps): JSX.Element {
    /**
     * We grab the {@link User} from the 3rd-party.
     */
    const [user, setUser] = React.useState<User>();
    React.useEffect(() => {
        getUser().then((user?: User): void => {
            setUser(user);
        });
    }, []);

    /**
     * If we do not have a {@link User},
     * then authentication was not successful.
     * Datadog will not actually render the custom widget in this case,
     * but we still have to handle this case.
     */
    if (user == null) {
        return <></>;
    }

    return (
        <>
            <h2>Posts from {user.username}!</h2>
            <ol>
                {user.posts.map(
                    (post: Post): JSX.Element => {
                        return <li key={post.title}>{post.title}</li>;
                    }
                )}
            </ol>
        </>
    );
}

/**
 * This component renders the side-panel content.
 */
function SidePanel(props: SidePanelProps): JSX.Element {
    return (
        <div
            style={{
                fontFamily: 'helvetica, arial, sans-serif',
                margin: '0.5rem'
            }}
        >
            <PostsComponent client={props.client} />
        </div>
    );
}

function renderSidePanel(client: DDClient): void {
    ReactDOM.render(
        <React.StrictMode>
            <SidePanel client={client} />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

export { renderSidePanel };
