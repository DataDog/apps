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
             * The `npm` plugin allows us to publish packages to `npm`.
             * https://intuit.github.io/auto/docs/generated/npm
             */
            'npm',
            /**
             * The `pr-body-labels` plugin allows us to set the kind of release from a PR.
             * https://intuit.github.io/auto/docs/generated/pr-body-labels
             */
            'pr-body-labels',
            /**
             * The `released` plugin updates issues/PRs with the released version.
             * https://intuit.github.io/auto/docs/generated/released
             */
            'released'
        ]
    };
}
