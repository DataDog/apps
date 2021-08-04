# Writing your first UI app

## What is an App?

Apps are **anything that you can think of inside of Datadog**, this could be as simple as:
-   A widget that can visualize data that is not in Datadog’s backend
-   Cost Optimization tools inside the UI
-   Scheduling reports directly from a dashboard
-   New ways of displaying data

We're actively working on extending the features and building blocks that are available to you.

## Creating your first app

Watch the **5 minute walkthrough** at https://a.cl.ly/eDuwD7m0


Steps:

1ꓸ Open https://app.datadoghq.com/apps, and click on “New App”

![s1](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/kpu7mnQ5/691d1b66-1622-419d-a561-dbda1054e732.png?source=viewer&v=0e8849313e0baaf4e4068003cca5e872)

2ꓸ Under the "features > UI Extensions" section, toggle "Dashboard custom widget".

Tip: Try changing the name of the application / widget it will add.

![s2](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/ApuRO9ng/ef85d969-0c75-4b78-a51b-5ceaaec16c6a.png?source=viewer&v=01285d41744c1d83a80c1c4f79a47027)


3ꓸ Save your application, then install it.

![s3](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/wbu9kR6b/95bdb3b4-e89e-448e-b0be-e03a00afd6f0.png?source=viewer&v=f086ccdaf1495c9534cd3ad26051b630)

4ꓸ Open any dashboard and browse the widget tray, you will see the new widget type there. Try dragging it on your board.

![s4](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/geu4rA0v/a2642123-dec1-4bd4-a230-7fdea09ab4c4.png?source=viewer&v=010ae411a8121978f232705050d64d75)

You will soon notice it’s a blank widget ! No worries ! We’ll show you how to change that

![s5](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/DOu2vBjj/d7f53a25-1f4c-4c45-8820-d6c78ad75e50.png?source=viewer&v=89769497f7a1f3a83f15c21c56a234f8)

## Let’s make that widget your own - Widget Customization

First, let's get our dev environment set up.

```
cd examples/apps-starter-kit
yarn install
yarn start
```

You should be greeted by a page looking like this

![s6](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/X6u9DlY0/e5fc94d8-1772-40eb-a793-0e6e80850617.png?source=viewer&v=473644c06de6bf687d228366746c9042)

As you see the message, you’ll realize there are two pages:

- http://localhost:3000 A main controller that orchestrates all of the different pieces your application is made of (widgets, menu, modals..). It will come in handy as your app becomes richer in functionality.

- http://localhost:3000/widget Components for widgets, modals, or anything that needs a dedicated display

✅ Tip: Check out App Platform Developer Guide for a deep dive into this architecture.

Great ! Let’s get your widget running in a dashboard. We will need to point the source field of the widget configuration to http://localhost:3000/widget

```json
"widgets" : [
    {
        // the name of the widget, as it will appear on the tray
        "name": "Your first app", 
        
        // the code your widget will execute
        "source": "http://localhost:3000/widget",
        
        // configuration options that autogenerate editors
        "options": [...],
        
        // the icon that will appear in the widget tray
        "icon": "https://static.datadoghq.com/static/favicon.ico",
        
        // the key, used to tell apart 2 widgets from the same app
        // don't change this after you created the widget
        "custom_widget_key": "your_first_app" 
    }
]
```

✅ Tip: Try modifying the contents. It’s your own widget now! Give it a nice name.

If everything went well, the widget should now display in a the dashboard.

![s8](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/Qwu9G5e8/c96824e4-66cb-4644-adba-34e27c297cb2.png?source=viewer&v=514b36d5db8baf5dc6d8d3675b441d4d)

✅ Tip: Try modifying the content of your code and see the widget change in the dashboard.

## Using developer Mode

![dev_mode1](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/yAu6LyoN/3ee9c354-00a6-4789-8a62-42abcac4500f.png?source=viewer&v=0eaa32e5d1121d0261332af776a89f9b)

With developer mode, every widget will have a toolbar to make your DX better. For example, it allows you to refresh the widget you’re developing without refreshing the whole dashboard.

![dev_mode2](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/jkuen4y2/6c92f76c-5540-47fe-9c84-74a3676f5c1e.png?source=viewer&v=97ec2c27cb0b98c69ce09d5a3a5d7a6c)

## I want to publish my app now !

```
yarn build
```

The command above will build the app.

Next, you’ll need to host this app on your infrastructure so that it’s reachable from the customer clients.