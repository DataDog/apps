---
title: Datadog Apps
kind: documentation
further_reading:
  - link: "https://github.com/DataDog/apps/blob/master/docs/en/ui-extensions-design-guidelines.md"
    tag: "Github"
    text: "Design Guidelines"
  - link: "https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md"
    tag: "Github"
    text: "Programming Model"
---

## Join the Beta! 
Datadog Apps is currently in beta, but you can easily request access! [Use this form][5] to submit your request today. Once approved, you can start getting creative and develop your App for you, your organization, or for publishing to the entire Datadog community alongside our other great Datadog Apps!

## What is an App?

Datadog Apps enable developers to extend the native functionality of Datadog through custom dashboard widgets. For example, if there is a data visualization you want that Datadog does not support, or a common remediation workflow you execute in a third-party platform, you could write an app to extend this functionality within Datadog.

## Setup

### Create an app

1. Create a Datadog App.

$ `yarn create @datadog/app`

2. Navigate to the folder you have created.

$ `cd starter-kit`


3. Set up your development environment.

$ `yarn start`

This starts your local development server on http://localhost:3000/.

<img style="max-width:80%" alt="Application has loaded" src="https://user-images.githubusercontent.com/228230/137548156-3c41407d-ee2f-423d-8a6e-8533115d462b.png">

If you see this message, your application is running.

Note that there are two pages:
`http://localhost:3000`: A main controller that orchestrates all of your different extensions (such as widgets, menus, or  modals). It will come in handy as you enrich app functionality.

`http://localhost:3000/widget`: Components for widgets, modals, or anything that needs a dedicated display.

See the [Developer Platform Developer Guide][3] for details about this architecture.

4. Go to your [Developer Platform][4] within Datadog and click on **+ New App** in the upper right.

<img style="max-width:80%" alt="New App" src="https://user-images.githubusercontent.com/228230/137548671-c0c64c2e-e3cd-494b-990c-8dc8a90d4800.png">

5. Enter a name for your application. Choose a distinct name so that you can differentiate it from any other apps you may be creating.

6. You are then presented with the dashboard for your new application. You can further change your app name here, give your app a more detailed description, or change its icon.

<img style="max-width:80%" alt="App Settings Dashboard" src="https://user-images.githubusercontent.com/228230/137548724-0487c169-9b65-4b31-bfa6-f8da3bbd2785.png">


### Add your app to a dashboard

1. Before you can add your app to a dashboard, you must enable it by clicking on **UI Extensions** on the left side.

<img style="max-width:80%" alt="Enable UI Extensions" src="https://user-images.githubusercontent.com/228230/137548823-0ad7f1ae-512f-44a4-93ca-c2aa3c47b992.png">

Once this view loads, click on the **Enable UI Extensions** button. 

2. You are then presented with more options for your app.

Make sure you change the root URL and debug mode root URL to match the localhost version of the widget that you have running. The main controller path is `/widget`. These URL values will change as you build your application and begin to host it on your own infrastructure.

3. Turn the toggle 
to ‘Dashboard Custom Widget’ on. This generates JSON on the right hand side. 

<img style="max-width:80%" alt="Dashboard Custom Widget" src="https://user-images.githubusercontent.com/228230/137549275-f901e4c1-16ad-4c82-95f3-9ba7f346c9ba.png">


Note that this JSON contains a value called `Your first widget`. This is the name of your widget as it appears in the menu to add to your Dashboards.

4. Navigate to your dashboard and add a widget.

<img style="max-width:80%" alt="Dashboard add widget" src="https://user-images.githubusercontent.com/228230/137550297-3f98c5e0-0826-4109-b6e4-bf6dd1209aa2.png">


5. The **Custom Widgets** section is at the bottom of the sidebar. Find your widget in the list and add it to your dashboard. 

<img style="max-width:80%" alt="Custom Widfget" src="https://user-images.githubusercontent.com/228230/137550380-7b9b222d-c848-4d17-9060-cd0345780a11.png">

6. A preview of your new widget appears, along with some options. Scroll down in the modal and click *Done* to add it to your dashboard.

<img style="max-width:80%" alt="New Application" src="https://user-images.githubusercontent.com/228230/137550741-669f69c6-4a9b-4253-afc4-be3257a1084e.png">

<img style="max-width:80%" alt="New Application 2" src="https://user-images.githubusercontent.com/228230/137550757-96bce01d-2ec4-4c0f-b045-e18b756e52df.png">



To build your application, run `yarn build` in your termal. Then move your static generated site to the hosting of your choice and update the URLs in the app settings.

### OAuth API Access

When this feature is enabled, users need to be authenticated before using the app. This feature allows you to integrate your existing authentication mechanism (for example, cookie-based username/password login) with the Developer Platform.

### Sample Applications

[Starter kit][1]

[Sentiment analysis][2]


[1]: https://github.com/DataDog/apps/tree/master/examples/starter-kit
[2]: https://github.com/DataDog/apps/tree/master/examples/sentiment
[3]: https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md
[4]: https://app.datadoghq.com/apps
[5]: https://dtdg.co/3E5iHd8
