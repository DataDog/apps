// `auto` doesn't get resolved properly for `eslint`.
// This seems to happen because it's `main` field lists a file that doesn't exist.
// If we find a way to address that, we can remove this disable.
// eslint-disable-next-line import/no-unresolved
import { AutoRc } from 'auto';

export default function rc(): AutoRc {
    return {
        /**
         * The `git` author used for changelog PRs.
         * Object syntax not permitted in TypeScript yet.
         * https://intuit.github.io/auto/docs/configuration/autorc#author.
         */
        author:
            'github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>',

        plugins: [
            /**
             * The `npm` plugin allows us to publish "canary" packages to `npm`.
             * https://intuit.github.io/auto/docs/generated/npm
             */
            'npm'
        ]
    };
}
