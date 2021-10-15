# Writing your first App

## What is an App?

Datadog Apps enable developers to extend the native functionality of Datadog through custom dashboard widgets. For example, if there is a data visualization you want that Datadog does not support, or a common remediation workflow you execute in a third-party platform, you could write an app to extend this functionality within Datadog.

## Setup

### Create an app

1. Clone the Datadog Apps starter kit. 
$ git clone git@github.com:DataDog/starter-kit.git 

2. Navigate to the folder you have cloned. 
$ cd starter-kit


3. Set up your development environment.
$ yarn install
…
$ yarn start

This starts your local development server on http://localhost:3000/.

If you see this message, your application is running.

Note that there are two pages:
`http://localhost:3000`: A main controller that orchestrates all of your different extensions (such as widgets, menus, or  modals). It will come in handy as you enrich app functionality.

`http://localhost:3000/widget`: Components for widgets, modals, or anything that needs a dedicated display.

See the Developer Platform Developer Guide for details about this architecture.

4. Go to your Developer Platform within Datadog and click on + New App in the upper right.

5. Enter a name for your application. Choose a distinct name so that you can differentiate it from any other apps you may be creating.

6. You are then presented with the dashboard for your new application. You can further change your app name here, give your app a more detailed description, or change its icon.

### Add your app to a dashboard

1. Before you can add your app to a dashboard, you must enable it by clicking on UI Extensions on the left side.

Once this view loads, click on the Enable UI Extensions button. 

2. You are then presented with more options for your app.
Make sure you change the root URL and debug mode root URL to match the localhost version of the widget that you have running. The main controller path is /widget. These URL values will change as you build your application and begin to host it on your own infrastructure.

3. Turn the toggle next to ‘Dashboard Custom Widget’ on. This generates JSON on the right hand side. 

Note that this JSON contains a value called Your first widget. This is the name of your widget as it appears in the menu to add to your Dashboards.

4. Navigate to your dashboard and add a widget.
