import {
    DDClient,
    GetDashboardCustomWidgetOptionsRequest,
    GetDashboardCustomWidgetOptionsResponse,
    WidgetOptionItemType
} from '@datadog/ui-extensions-sdk';

type Breed = {
    id: number;
    name: string;
};

type WidgetOptionEnum = {
    label: string;
    value: string;
};

export const setupCustomWidget = (client: DDClient): void => {
    const breedsResponse: Promise<Breed[] | void> = fetch(
        'http://localhost:3001/breeds'
    )
        .then(res => res.json())
        .then(res => res.breeds)
        .catch(err => console.log('An error occurred fetching breeds', err));

    client.dashboard.customWidget.onOptionsRequest(
        async (
            request: GetDashboardCustomWidgetOptionsRequest
        ): Promise<GetDashboardCustomWidgetOptionsResponse> => {
            const breeds = await breedsResponse;
            if (breeds == null || breeds.length === 0) {
                return { options: [] };
            }

            const enumOptions: WidgetOptionEnum[] = [
                {
                    label: 'All Breeds',
                    value: '0'
                }
            ].concat(
                breeds.map(
                    (breed: Breed): WidgetOptionEnum => ({
                        label: breed.name,
                        value: breed.id.toString()
                    })
                )
            );

            return {
                options: [
                    {
                        type: WidgetOptionItemType.STRING,
                        name: 'breed',
                        label: 'Select a Dog Breed to get Random Images of',
                        enum: enumOptions,
                        order: 1
                    }
                ]
            };
        }
    );
};
