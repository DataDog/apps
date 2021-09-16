# UI-Extension Design Guidelines # 

## Table of Contents
* [UI-Extensions](#ui_extension)
  *    [Dashboard Cog Menus](#cogmenus)
  *    [Dashboard Context Menus](#contextmenus)
  *    [Dashboard Modals](#modals)
  *    [Dashboard Side Panels](#sidepanels)
  *    [Dashboard Widgets](#widgets)
* [Visual Design](#visual_design) 
* [User Interaction & Communication](#user_interaction)
* [Components](#components)
     

## Key
* Required*
* Suggested

## UI-Extensions* <a name="ui_extension"></a>

### Key Takeways
* **Make sure your apps are high quality.** There shouldn't be any bugs or loading issues. 
* **Consider the environment that your designing for.** The ui-extension should mesh well with the page and follow general patterns within the product space. e.g. Established Datadog dashboard paradigms.
* **Reduce the complexity of the feature to the most important elements whenever possible.**
* **Don't recreate your entire dashboard within a Datadog dashboard.**  The value of ui-extensions from a user perspective is in seeing your apps content and Datadog content tightly integrated.

-----

![picture alt](https://d6pdqlw297isz.cloudfront.net/i/Z4uj28rb/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/Z4uj28rb/f87fef76-90f9-497c-91aa-f55c03fbf0c6.png?source=thumbnail&v=38ff30f0310c2952f47ad6bb7f2db2f4)
### Dashboard Cog Menu Items <a name="cogmenus"></a>
Cog menus items surface up custom progressively disclosed links within the Dashboard’s settings menu that drive users to other ui-extensions or external sites. e.g. a user clicks on a cog menu item which opens up an external web page.

#### When to Use a Context Menu Item
Use a cog menu item when you’d like to drive the user to another ui-extension or external webpage and the action is more top-level. 

#### Best Practices
* Cog menu names should be clear and actionable. 
* Keep context menu names short and to the point so that the content doesn’t overflow onto a second line. 

-----

![picture alt](https://d6pdqlw297isz.cloudfront.net/i/eDuReJgz/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/eDuReJgz/985f00e6-7b97-4066-9410-a1880f8bb4d1.png?source=thumbnail&v=bbbdadfc8b16aeecdc195f23333f4035)
### Dashboard Context Menu Items <a name="contextmenus"></a>
Context menus extend widget functionality by surfacing up custom progressively disclosed links to drive users to other content. They can be used in conjunction with other ui-extensions. e.g. a user clicks on a context menu item which opens up a side panel.

#### When to Use a Context Menu Item
Use a context menu item when you’d like to drive the user to another ui-extension or external webpage to learn more about a datapoint. e.g. To push the user to your own app. 

#### Best Practices
* Context menu names should be clear and actionable. 
* Keep context menu names short and to the point so that the content doesn’t overflow onto a second line. 
* Minimize the number of context menu items per app so that the context menu isn’t overloaded with rows. 

-----
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/yAuyBm0z/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/yAuyBm0z/3f7d73d7-07bc-458e-b275-5570b6971b44.png?source=thumbnail&v=d6826060511602af894f7d794b9f7baf)
### Dashboard Modals <a name="modals"></a>
Modals are overlays that appear atop the entire page and prevent interaction elsewhere until some kind of action is taken. They are used in conjunction with other ui-extensions. e.g. a user clicks on a link in a widget which opens a modal.

#### When to Use a Modal
* Use a modal when you’d like to focus the user on resolving a specific task with clear confirm/cancel actions. 
* Use a modal if the background content (the dashboard) isn’t relevant or intended to be interactable. 

#### Scenarios
* **Completing a task:** Use a modal when you’d like to focus the user on a specific task that is coupled with  confirm/cancel actions. 
* **Confirming an action or alert** Use a modal when you’d like the user to confirm an action they just took or a consequence of an action. It may be paired with a warning or critical information related to that action. Confirmation isn't necessary when the consequences of an action are reversible or negligible. e.g. If a check mark shows an image has been selected, further confirmation is unnecessary.
* **Communicating an error** If an action a user took led to an error, modals can be used to surface up details about the error and give the user a chance to resolve it.  
* **Displaying lengthier help information** If the help information is relatively short, display it in a tooltip on hover instead.

#### Best Practices
* Modals should be responsive with no horizontal scrolling and the most important information above the fold.
* Modals can have vertical scrolling.
* Modals can have multiple views but the user must confirm each view as part of a linear flow with a clear back button.
* Don’t display a modal within a modal or atop another modal. 
* Clicks that trigger other side panels, modals, or external pages to open should always be paired with a clear call to action. 
* Use a clear signifier if a link pushes a user to an external page. e.g. An external link icon.
* Use the bottom footer of the modal to communicate actions the user can take on the task. 
* Have clear delineations between steps in the flow.
* Communicate to the user fields that are required vs optional.
* Display a toast once the task is completed. 

----------

![picture alt](https://d6pdqlw297isz.cloudfront.net/i/GGupdw4R/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/GGupdw4R/46570294-b321-4c06-81ca-1fab489eab7e.png?source=thumbnail&v=4d22d319bc6cf1d9348e3c170c2b461e)
### Dashboard Side Panels <a name="sidepanels"></a>
Side panels display contextual information in a panel that slides out from the right edge of the viewport. They are used in conjunction with other ui-extensions. e.g. a user clicks on a link in a widget which opens a side panel.

#### When to Use a Side Panel 
* Use a side panel when you’d like to help the user gain additional context into something or for querying (not for linear flows/tasks that are resolved with a confirmation button).
* Use a side panel when the background content is relevant or intended to be interactable. 

#### Best Practices
* Side panels should be responsive with no horizontal scrolling and the most important information above the fold.
* Side panels can have vertical scrolling.
* Side panels can have multiple views. Use tabs anchored to the bottom of the header. 
* Don’t display a modal within a side panel. If needed, use the modal ui-extension which should take over the entire page.
* Clicks that trigger other side panels, modals, or external pages to open should always be paired with a clear call to action. 
* Use a clear signifier if a link pushes a user to an external page.
* Allow the user to use the esc keyboard shortcut to close the side panel. 

----------

![picture alt](https://d6pdqlw297isz.cloudfront.net/i/12uvbZA6/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/12uvbZA6/638f6f36-8134-4118-96e5-a3b50b90d445.png?source=thumbnail&v=be265b40227e4429f9ea53013971bd27)

1.Widget Tray Token, 2.Widget
 
### Dashboard Widgets <a name="widgets"></a>
Widgets are Dashboard tile components filled with graphs or other information. The user can create a widget instance by dragging the widget tray card onto the board, selecting the editing options, and confirming. Widgets can be resized and resorted manually by the user.

#### Widget Tray Token
* Keep the widget tray name short and to the point so it doesn't wrap to two lines. 
* Name the app something that’s relevant to the core value proposition of the feature. e.g. Datadog Action Items. 

#### Widget Editing Options
* Have defaults for all selections. 

#### Widget Scenarios
* **Visualizing data** [Review our data visualization](#dataviz) section within user interaction & communication to learn more about our recommendations. Widgets with data visualization should scale vertically and avoid scrolling.   
* **Displaying action items** Use a table to improve the users ability to quickly find and resolve action items. [Review our table section](#table) within components to learn more about our recommendations. Widgets with tables shouldn’t scale vertically and should scroll.   
* **Complex Scenarios** Don’t display multiple tiles/cards within a widget. Instead, make each tile/card it’s own widget. Try to limit the number of widgets to something reasonable like 2-3 per app. 

#### General Best Practices
* **Keep the experience within the widget tile as simple as possible.** Don’t display multiple views or complex progressively disclosed components within the tile. 
* **Avoid displaying overlays like modals, popovers, and toasts in the widget with the exception of tooltips or simple select menus.** If you need to confirm an action, use an inline confirmation rather than a toast.
* **If a task requires more than a click of a button to resolve, push the user to a ui-extension modal or sidebar to resolve the task.**
* **Widgets should be responsive with no horizontal scrolling and the most important information above the fold.** By default, UI-extension widgets have a ratio of 2x1 and will take up a third of the board. The widget can be resized to take up the full width of the board or at a minimum 1/6th the board. The extension must resize to fit these varying horizontal widths.
* **Clicks that trigger actions within the tile should give the user proper feedback.** Display a time series tooltip when a user clicks into a graph.  


## Visual Design <a name="visual_design"></a>

### Typography* 
* Only emphasize the most important information. Too much competing information can make it difficult to scan the page. 
* **Minimize the number of typefaces you use.** Mixing too many distinct typefaces can make your app seem fragmented and sloppy.
* Keep button text readable and short. Don’t use expressive fonts as button text, including display, handwritten, and script styles. Copy should be specific but to the point.
* Don’t use serif fonts. Only use sans-serif.

### Logos*
* **Widget logos should be high quality.** Logos should be svgs with a dimension of 128px x 128px.
* **Add a darkmode and lightmode logo via the repository.** The darkmode logo should be white and the lightmode logo should be in color. View other dark mode guidelines [here](#darkmode).  

### Color*
* Color should be hierarchical. Important elements should stand out the most.
* **Use color sparingly for communication.** For example, a red triangle that warns people of a critical problem becomes less effective when you use red elsewhere in an app for noncritical reasons.
* **Don’t use colors that make it difficult for people to perceive the content.** For example, color blind people might not be able to distinguish some color combinations, and insufficient contrast can cause icons and text to blend with the background and make content hard to read.
* Use text size to help determine color contrast. In general, smaller or lighter-weight text needs to have greater color contrast to be legible.
* **Define one color for the following:**

    Primary color  | Secondary color | Disabled color | Error color | Primary text color | Secondary text color
    :-------------  | :--------------- | :------------- | :------------ | :------------------ | :--------------------
    Used for call to actions and links. | A secondary color provides more ways to accent and distinguish your product. | Used for elements that are normally interactive but are read-only. | Indicates errors in components, such as invalid text in a field. | Used for headlines and important text.| Used for body copy and less emphasized text.
    ![picture alt](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/bLuqZyPx/bd1534e0-f27f-4783-beaa-c719ba32915f.png?source=viewer&v=c353508c59999883c0e1ef854442f0a9") | ![picture alt](https://d6pdqlw297isz.cloudfront.net/i/nOuvLQyr/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/nOuvLQyr/4957dc4f-4028-4820-a0b4-69f624e49d94.png?source=thumbnail&v=8454ee091177513fd75a5df417df0976) | ![picture alt](https://d6pdqlw297isz.cloudfront.net/i/lluoX8py/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/lluoX8py/4f744374-c044-4f8c-9144-faecb14f093f.png?source=thumbnail&v=cccd0460b2c930865d0b9ee3e3f9daaf) | ![picture alt](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/RBuLJzp4/13506278-6dc4-4f56-95ec-aa3e32829505.png?source=viewer&v=1008e16b7ba73557a6418e839477192a) | ![picture alt](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/8Lu5Y6z1/23c02f73-0b50-46ad-b141-86c45a045907.png?source=viewer&v=98ac4c333987ccedd932fbf0a0534c0b) | ![picture alt](https://d6pdqlw297isz.cloudfront.net/i/z8urbd2y/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/z8urbd2y/3386a7cf-5696-4760-a48b-1fb189103897.png?source=thumbnail&v=91c0f3d0a2aef395bff6d9d6d3da6ba0)

### Dark Mode <a name="darkmode"></a>
A significant percentage of our user base uses dark mode. We recommend making a dark mode version of your app to ensure these users have a high-quality experience. You can define the color theme in the GitHub repository with the attribute `colorTheme` (`dark` or `light`).

* **Make colors lighter and desaturated.** Saturated colors can visually vibrate against dark surfaces, making them harder to read. Use lighter tones (colors in the 200–50 range) because they have better readability on darker surfaces.
* Avoid pure black. Dark gray surfaces reduce eye strain — light text on a dark gray surface has less contrast than light text on a black surface. 
* Test your design in both light and dark appearances. See how your interface looks in both appearances, and adjust your designs as needed to accommodate each one. Decisions that work well in one appearance might not work in the other. 

### Accessibility
We recommend your app makes as best an effort as possible to comply with  WCAG 2.1 AA standards. View the latest published standards regarding [perceivability](https://www.w3.org/WAI/WCAG21/quickref/#principle1/ "perceivability"), [operability](https://www.w3.org/WAI/WCAG21/quickref/#principle2/ "operability"), and [understandability](https://www.w3.org/WAI/WCAG21/quickref/#principle3/ "understandability"). 

We recommend you use the tool [Lighthouse](https://developers.google.com/web/tools/lighthouse#devtools/ "Lighthouse") to check the performance of your app. 

## User Interaction & Communication <a name="user_interaction"></a>

### Authentication & Authorization*
Datadog handles authentication and authorization and we require that you use our authentication hooks. 

### Formatted Time
We recommend you use Datadog time conventions although this isn't a requirement at this time. Datadog uses [date-fns](https://date-fns.org "date-fns") for time conventions. It’s important to note that time zones are a Datadog user setting that can override your default settings. 

Our time conventions for when **date/time stand alone** (not in a table):

Format | Output
:------------- | :-------------
h:mm a  | 8:36 am
MMM D, h:mm a  | Dec 13, 8:36 am
MMM D, h:mm:ss a  | Dec 13, 8:36:00 am
ddd, MMM D, h:mm:ss a  | Wed, Dec 13, 8:36:00 am
MMM D, YYYY, h:mm a  | Dec 13, 1989, 8:36 am
ddd, MMM D, YYYY, h:mm:ss a  | Wed, Dec 13, 1989, 8:36:00 am
MMM DD, YYYY [at] HH:mm:ss.SSS | Dec 13, 1989 at 08:36:00.000

Our **table** time conventions:

Format | Output
:------------- | :-------------
MMM DD HH:mm:ss  | Dec 13 08:36:00
MMM DD HH:mm:ss.SSS  | Dec 13 08:36:00.000
MMM DD YYYY  | Dec 13, 8:36:00 am
MMM DD YYYY HH:mm | Dec 13 1989 08:36

### Data Entry*
* **Use an introductory label or placeholder text to communicate purpose.** A label helps users understand what type of information they should enter. A text field can also contain placeholder text—such as Email or Password—when there’s no other text in the field. A label is often unnecessary when placeholder text is present. Generally, labels should use title-style capitalization while placeholder text should use sentence-style capitalization.
* **Consider using an expansion tooltip to show the full version of clipped or truncated text.** An expansion tooltip behaves like a help tag and appears when the user places the cursor over the field.
* Use a number formatter to aid the user with numeric data entry if needed. 
* Enable advancement only after collecting required values. Before enabling a Next or Continue button, make sure all required fields have values. The enabled button provides a visual cue that it’s OK to proceed.
    
### Data Visualization* <a name="dataviz"></a>
Data visualization portrays information graphically which makes it easy to compare and make decisions surrounding data. The type of chart you use depends on what you want users to do with the data.

* **The presentation of the data should be accurate.** Make sure the way the data is presented isn’t distorted. 
* **Progressively disclose additional details.** The user should be able to hover over a datapoint and receive additional context via a tooltip. e.g. a description/value.
* **Don’t bold too many typographical elements.** Bolding too many typographical elements makes it difficult for users to scan text. 
* **If your graph has multiple elements and the user is hovering over one, grey out the elements to help the user focus on the right one.** e.g A stacked bar chart.
* **Don’t solely rely on icons to convey important information.** Icons alone might not be intuitive enough for users to understand the meaning. 
* Surface up legends. Place legends below charts so users can understand the graph.
* Incorporate zooming and panning if needed. Zooming changes whether the UI is shown from either nearer or farther away.  Zoom occurs through clicking and dragging, or scrolling. Panning allows the user to explore the UI that expands beyond the screen. Panning and zooming are often paired together.


If users need to see **changes over time** use:

Image | Name | Description
:------------- | :------------- | :-------------
 ![picture alt](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/2Nulp9OP/3579bd02-95b9-4775-aea2-e978da86ebd2.png?source=viewer&v=95a0d4d83e2bde2aa8744547800218cf)  |   Line Charts  |  To express minor variations in data.
 ![picture alt](https://d6pdqlw297isz.cloudfront.net/i/YEuO4J24/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/YEuO4J24/3fd6f998-386f-4fda-80a7-f3fbc7bc07b1.png?source=thumbnail&v=8b3f7ccde94cbd10acde53d9d2ed9c07)  |   Bar Charts  | To communicate changes over time and how individual data points relate to a whole or compare to one another.
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/NQuYpB0X/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/NQuYpB0X/83a8f8b2-0fa5-4d47-b4c4-ec33a6526d53.png?source=thumbnail&v=4e90835fbd345ca986d93ae3ea67ec4) |  Stacked Bar Charts | To express larger variations in data and to break down and compare parts of a whole.
![picture alt](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/xQu6EJ44/8a036bf5-dd34-4fe5-a393-4faca02309cd.png?source=viewer&v=d3a6fcb9acfa185473bb8c5503a5e525)   |  Area Charts | To summarize minor variations in data. The space between the x-axis and line is filled. 
![picture alt](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/Z4ujG9lE/35754dcc-7036-406e-a90f-9d870c7f0d64.png?source=viewer&v=8c0b4c605597bedfb4c8ff06305939f3)   |  Timelines | To communicate a series of events over time. 
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/6quYJ1OD/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/6quYJ1OD/0ad2c934-dd34-42eb-b3cd-46019abca58a.png?source=thumbnail&v=38b1447e688c0ad70ecaeae57562c380)  |  Horizon charts | To express several stacked line or area charts. 
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/eDuREZ2O/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/eDuREZ2O/ee05fedd-1115-46ba-81b1-f6186793b0c1.png?source=thumbnail&v=3c598104ef8d7b8b3f156b72984e7fe1)  |  Waterfall charts | To communicate the cumulative effect of positive or negative values over time.


If users need to see **compare datapoints** use:

Image | Name | Description
:------------- | :------------- | :-------------
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/YEuO4J24/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/YEuO4J24/3fd6f998-386f-4fda-80a7-f3fbc7bc07b1.png?source=thumbnail&v=8b3f7ccde94cbd10acde53d9d2ed9c07) | Bar Charts  | To communicate changes over time and how individual data points relate to a whole or compare to one another.
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/Qwu5BEXB/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/Qwu5BEXB/fe59b199-ed68-455f-94ff-acb4732aa5fa.png?source=thumbnail&v=0c4167949c11a1144e5a51962421a5e0) | Bubble Charts | To express the relationship between three dimensions of data (x axis, y axis, and bubble size).
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/6quYwv5o/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/6quYwv5o/06234d3a-d550-47a9-bbd4-1d5d4bc01908.png?source=thumbnail&v=14dc89d5729cb86965a572534a178c8c) | Multi-line Charts | To summarize minor variations in data. The space between the x-axis and line is filled. 
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/bLuqydeo/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/bLuqydeo/08c8e1a4-fd02-46d6-895f-9d3dd85b854f.png?source=thumbnail&v=1dc8d1f3c81707d7c11d326b4cd91d30)  | Parallel Coordinate Charts | To compare many variables and uncover the relationships between them. Each variable is given its own axis and all the axes are placed in parallel to each other. 
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/Wnu0pYXv/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/Wnu0pYXv/666c88ef-b209-4731-8798-ae9b2e21b08f.png?source=thumbnail&v=a4097158000f93d5a70d3ff454eff1c6) | Bullet Charts | To compare the performance of a primary measure to one or more other measures.
 

If users need to see **how elements add up to a total** use:

Image | Name | Description
:------------- | :------------- | :-------------
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/NQuYpB0X/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/NQuYpB0X/83a8f8b2-0fa5-4d47-b4c4-ec33a6526d53.png?source=thumbnail&v=4e90835fbd345ca986d93ae3ea67ec4) | Stacked Bar Charts | To express larger variations in data and to break down and compare parts of a whole.
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/kpunR6YG/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/kpunR6YG/68969f07-3697-4d7e-af03-e96c8cd01c04.png?source=thumbnail&v=d98d8f78d8e3d8d9746d34d46c1583b7) | Pie Charts | To communicate percentages of a whole.
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/6quYwv5o/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/6quYwv5o/06234d3a-d550-47a9-bbd4-1d5d4bc01908.png?source=thumbnail&v=14dc89d5729cb86965a572534a178c8c) | Stacked Area Charts | To track minor variations of data across groups and to see how those breakdowns contribute to a total. 
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/04uxd5Yg/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/04uxd5Yg/60b9f844-279c-430a-9803-0323d64cfe3e.png?source=thumbnail&v=ffe100188095441284e595551feae0aa) | Tree Map Charts | To visualize hierarchical data using nested figures, usually rectangles. 


If users need to see how an **item ranks in comparison to others** use :

Image | Name | Description
:------------- | :------------- | :-------------
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/KouJN7W9/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/KouJN7W9/26eda197-f476-4dfd-9592-4a29c039b921.png?source=thumbnail&v=ea8d066484aebaa34f11892a108a3b2d) | Ordered bar charts | To communicate changes over time and how individual data points compare to one another. The bars are rank ordered.
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/bLuqydeo/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/bLuqydeo/08c8e1a4-fd02-46d6-895f-9d3dd85b854f.png?source=thumbnail&v=1dc8d1f3c81707d7c11d326b4cd91d30) | Parallel coordinate charts | To compare many variables and uncover the relationships between them. Each variable is given its own axis and all the axes are placed in parallel to each other.


If users need to see how often a **value occurs in a dataset**:

Image | Name | Description
:------------- | :------------- | :-------------
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/04uxdvkg/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/04uxdvkg/684af02f-95f4-4f11-934e-06cf8731e24b.png?source=thumbnail&v=f62deb6a2151d835f080c050ea7130df)  | Histogram charts | To depict the distribution of a dataset: how often values fall into ranges. Values are grouped into bins and the bins are displayed as segmented columns. 
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/Qwu5BweA/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/Qwu5BweA/706ea26d-7d9e-4e95-9609-f25fedbd99b2.png?source=thumbnail&v=52317b5ec26dc21fc031cb9888cddef2) | Box plot charts | To compare medians, ranges and variabilities effectively and across groups of different sizes. 
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/Apu9lgP1/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/Apu9lgP1/c7956b28-53b9-432e-a4ec-b4088dd94e94.png?source=thumbnail&v=badd6595b30034e28895f89b2467c258) | Violin charts | To visualise the distribution of data and its probability density. The width communicates the data’s frequency across upper, median, and lower ranges. 
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/yAuyn9on/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/yAuyn9on/b839d2c2-5f8f-4696-b674-de01ff8dfb6b.png?source=thumbnail&v=6eba593887a1bc777a457c9f2f117c5d) | Density charts | To visualise the distribution of data over a continuous interval or time period.


If users need to see how **multiple items relate to one another**:

Image | Name | Description
:------------- | :------------- | :-------------
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/6quYwJ22/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/6quYwJ22/bfd59d0f-69ca-469d-96f4-7d6846760685.png?source=thumbnail&v=9fead07048c0628becef98ad35c33b11) | Network charts | To show relationships between a group of entities through the use of nodes / vertices and link lines.
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/d5uRJDWo/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/d5uRJDWo/91298349-01a1-4aa3-aa1e-1e810bd76314.png?source=thumbnail&v=8219af194cac94bc3710e4418866ee3e)  | Venn diagrams | To show the commonalities and differences among things or groups of things through circles that overlap or don't overlap. 


If users need to see **movement of data across multiple states**:

Image | Name | Description
:------------- | :------------- | :-------------
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/eDuR0E1E/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/eDuR0E1E/01f7f341-57e1-4971-84f9-4b78d1821e3d.png?source=thumbnail&v=32e2c8cc77f0edcccdf7ccc4fca6142f) | Sankey charts | To visualize the flow from one set of values to another. Use when you want to show a many-to-many mapping between two domains or multiple paths through a set of stages. 
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/mXuKvG7d/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/mXuKvG7d/662f38b5-15b2-4076-bf1d-b413053f3d65.png?source=thumbnail&v=84fcc3c64136fddb92e50ce0996a196c) | Gantt charts | To show activities (tasks or events) displayed against time. 
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/6quYwJ22/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/6quYwJ22/bfd59d0f-69ca-469d-96f4-7d6846760685.png?source=thumbnail&v=9fead07048c0628becef98ad35c33b11) | Network charts | To show relationships between a group of entities through the use of nodes / vertices and link lines.


Color is another important consideration. Color can be used to:
* **Distinguish categories from one another.** Example: Color used to distinguish categories in a pie chart.
* **Represent values.** Example: Color used to indicate thresholds in a line chart. 
* **Highlight data.** Example: Color used to highlight data in a scatterplot chart. 

### Empty States
We recommend designing empty states for your ui-extensions when appropriate. Empty states can display a wide variety of content. For example, they can include a table without rows, or a search that returns no results. Although these states aren’t typical, they should be designed to prevent confusion.

The most basic empty state consists of a non-interactive image or icon, short descriptive text, and optionally a button.

Image | Text | Button (optional)
:------------- | :------------- | :-------------
Is neutral or humorous in tone. | Is helpful. | Is  actionable. e.g. “Clear search.”
Is related to the content. | Conveys the purpose of the context

### Help
Sometimes a feature needs clarification for a user to understand how it works. 

* For scenarios that call for shorter clarifications, progressively disclose clarifying information with a tooltip. 
* For scenarios that can for lengthier clarification, push the user out to an external webpage or modal within Datadog. 

### Keyboard
Don’t use keyboard shortcuts at the moment because we can’t guarantee that we can support them (they might conflict). Message us if you’d like to use keyboard shortcuts. 

### User Feedback
Feedback tells people what an app is doing, helps them understand the results of actions, and tells them what they can do next.

* **Interactive elements should have obvious hover states.** Hover states shouldn’t compete with UI backgrounds.
* **Post-click, provide appropriate feedback on the success of an interaction.** Display the post-click state in-line whenever possible. For forms or modals, display a toast.  
* **If a delay in providing feedback is unavoidable, display a loader or progress bar so users are aware.** 
* **Avoid unnecessary alerts.** Alerts are inherently disruptive by design and should be used sparingly. 

## Components <a name="components"></a>

### Buttons*
Buttons communicate actions that users can take. They are typically placed in the UI to save/confirm/edit/delete or drill into an action or resource. 

* **Buttons should be identifiable and clear.** Buttons should indicate that they can trigger an action with clear copy (we recommend using verbs or leading with them) and color to indicate they’re clickable. 
* **Buttons should be findable.** Buttons should be easy to find among other elements, including other buttons.
* **Don’t overuse primary buttons.** We recommend having one clear call to action whenever possible.
* **Don’t wrap button text.** For maximum legibility, a text label should remain on a single line.

When defining a button system, consider the following:

Image | Name | Description
:------------- | :------------- | :-------------
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/6quYwwGX/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/6quYwwGX/cd4121ca-700f-451f-84bb-4ca847baa136.png?source=thumbnail&v=a8df02f7b3d3625e8e6a549a1f953592) | Primary button | A button that has a fill. The most important call to action. 
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/jku466Wk/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/jku466Wk/026a0c31-e213-4102-a8b3-a7c055125020.png?source=thumbnail&v=5a1d8061e8b6e99bae5468c0f5fa7011)| Secondary button | A button that has an outline. Use for actions that are of medium importance.  
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/P8uGDDN0/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/P8uGDDN0/8d54f18d-dd14-4627-8f23-6bf55b3ffe49.png?source=thumbnail&v=03ee174cbee9928ed815770c2a946e65) | Tertiary button | A de-emphasized button that has text styling. Use for less important actions. 
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/lluo88gv/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/lluo88gv/a15713da-61e9-4dc6-8be4-eb5ad93d9370.png?source=thumbnail&v=eb22cbd493b96ce965180a60ff5e4b30) | Icon (optional) | A button can have an icon solely or in conjunction with text. We caution against the use of an icon only unless the icon is universal (e.g. a trash can to indicate a destructive action). 

Buttons states:

Image | State | Description
:------------- | :------------- | :-------------
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/jku46Bg5/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/jku46Bg5/e96ab08d-4ee6-4061-9d43-19e1d2d709d7.png?source=thumbnail&v=a8df02f7b3d3625e8e6a549a1f953592) | Enabled | An enabled button should look interactable.
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/E0ujmB2m/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/E0ujmB2m/468aead2-6391-46a0-99e9-f5e7006373b7.png?source=thumbnail&v=cd703373deb5aceb6e7061d082da851d) | Disabled | A disabled button should be greyed out. 
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/RBuLz2vx/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/RBuLz2vx/8c3a6482-0bdd-48e5-a358-b4e7bbe1c067.png?source=thumbnail&v=5954176e542a105577ddc6a84c9c01f5)| Hover | A button should have a more emphasized color or drop shadow to provide feedback to the user.
 
### Checkboxes*
Checkboxes allow users to select one or more items from a set. Checkboxes can turn an option on or off. 

* **Checkboxes should be easily identifiable.** It should be visible at a glance if a checkbox has been selected, and selected items should be more visually prominent than unselected items.
* **Checkboxes should be used instead of toggles or radio buttons if there are multiple options and more than one can be selected.**
* **Use checkboxes over dropdowns if you’d like to expose all available options to the user.** 

### Fields and Labels*
Fields let users enter and edit text. Labels describe the fields and are either positioned above or to the left of the field. 

Fields: 
* **Fields typically appear in forms or dialogs (in modals or pages).**
* **Fields should be discoverable and shouldn’t look like read-only text.** Text fields should stand out and indicate that users can input information.
* **Fields should be clear.** Text field states should be clearly differentiated from one another.
* **Fields should provide proper feedback.** Text fields should make it easy to understand the requested information and to address any errors.
* **Fields should have a consistent styling.**
* **Search fields should have an accompanying search icon to the left of the input text.** 
* **When a search field is selected, the user should be able to quickly clear the input via a cancel button.** 
* **Indicate fields that are required or optional (but never both).** Indicate whichever is less common.
* **Fields should have a treatment for error messaging.**  
* **Provide default values when possible.** To the extent possible, prefill fields with the most likely values. Providing good defaults minimizes decision making and speeds up data entry. Whenever possible, use autocomplete to offer suggestions as the user types. Autocomplete uses any text the user has entered so far to provide one or more suggested entries. The user can accept a suggestion or continue typing. Suggestions continue to be refined as more typing occurs.
* **Dynamically validate field values when possible.** Whenever possible, check field values immediately after entry so users can correct them right away.
* **If the field is a dropdown, display a caret fixed to the right to indicate to the user that the field will open a menu on click.**

A field should have a treatment for the following states:

Image | State | Description
:------------- | :------------- | :-------------
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/9ZuQLO5L/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/9ZuQLO5L/da523270-74f1-4f89-9645-ebf8d4a4bb6e.png?source=thumbnail&v=00134f80813a58445dd00662912131cb) | Enabled | Not selected and active. 
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/Wnu0p9L2/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/Wnu0p9L2/330f9889-e726-4cda-8a8d-5f44b8f1f5a6.png?source=thumbnail&v=0f0287b4ab40be3d3cdc1cba4fc95383) | Disabled | Read-only
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/X6ulnLg5/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/X6ulnLg5/584f1cc6-5d9b-46e9-97a0-2302b841e648.png?source=thumbnail&v=830b4d9f3dd249f040772da3504f7a81) | Hover | A cursor is positioned over the field.
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/xQu6NmGB/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/xQu6NmGB/2d8e185d-9626-438e-9b29-9a830e386f77.png?source=thumbnail&v=98b20a08d57630e2926f229995d61648) | Selected | A user has clicked the field.
![picture alt](https://d6pdqlw297isz.cloudfront.net/i/qGuJY89K/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/qGuJY89K/efd9c81d-ec0d-48f1-ac22-a85a28dd9b88.png?source=thumbnail&v=551bb89f3b04520890d7377b37d31c28) | Error | A field’s text isn’t accepted and messaging is displayed below the field that communicates how to fix the error. 

Labels (optional):
* A label is a static text field that describes an onscreen interface element or provides a short message. 
* Placement of labels should be consistent within a layout. Either place all labels above a field or to the left. 
* Labels can have helper text that is progressively disclosed via a tooltip. 

### Loaders*
Loaders inform the user of loading or computing processes being carried out by the system.

* Display a loader if the wait time is greater than a second. 
* **Keep loaders at a reasonable size**. No greater than 24px.

### Menus*
Menus display a list of choices on temporary surfaces.

* **We recommend limiting the use of menus in widgets.** Do not use menus in widgets for anything more complicated than a simple select or read only content.
* **Menus should be easy to open, close, and interact with.**
* **Menu items should be easy to scan.** 
* **Menu height and placement should be considered if placed inside a widget.** They might cause usability issues – especially in relation to responsiveness. 
* **Consider allowing the user to scroll within a menu if placed inside a widget.** Otherwise, the menu might be hidden from view if the list is long. 

### Radio Buttons*
Radio buttons allow users to select one option from a set.

* Use radio buttons over checkboxes if only one item can be selected.
* Use radio buttons over toggles if there are more than two options the user could select from.
* Use radio buttons over dropdowns if you’d like to expose all available options to the user. 
* Radio buttons should be easily identifiable. It should be visible at a glance if a radio button has been selected, and selected items should be more visually prominent than unselected items.

### Tables* <a name="table"></a>
Tables display sets of data across rows and columns. They organize information in a way that’s easy to scan so that users can look for patterns and develop insights from data. We recommend using the open source table library [datatables](https://datatables.net/).

* **Data tables should be well organized.** Information should be organized in a meaningful way, such as hierarchy or alphabetization. Less important information should be de-emphasized.
* **Data tables should be intuitive.** Data tables should be easy to use, with a logical structure that makes content easy to understand.
* **Data tables can include interactive elements such as checkboxes, sorting (on columns), icons and pills that communicate statuses/alerts, and pagination.** 
* **We recommend limiting popovers and other views within the table if the table is contained within a widget.** 
* **Text content shouldn’t run longer than the width of the column.** Use ellipsis if necessary with a tooltip that appears on hover. 
* **Data tables should have a default sort with a clear indicator of the sort direction.** The user should at minimum be able to reverse the sort. The user could optionally change the sort from something like most recent to alphabetical. 
* **If a row is selected, the row should display a background color.** 
* **If a user hovers over a row, the row should display a background color.** 

Tables can have the following:
* Header row
* Rows
* Pagination (optional)
* Row Checkboxes (optional)
* Sort Buttons
* Buttons that drive users to external web pages or other ui-extensions. We recommend limiting buttons to one primary action per row if possible. 


### Tabs*
Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy. Use tabs if you’d like people to quickly access longer buckets of content that are of equal importance. 

* Each tab should contain content that is distinct from other tabs in a set.
* We caution against the use of many tabs within a widget because the user shouldn’t horizontally scroll within a widget tile. 
* Within the context of a modal or side panel, the user can horizontally scroll to view additional tabs.
* Selected tabs should feel distinct from deselected ones. 
* Tabs should look selectable with clear hover states. 

### Toggles*
Toggles switch the state of a single item on or off.

* Use toggles over checkboxes if only one item can be selected.
* Use toggles over radio buttons if there are only two options the user could select from. e.g. on vs off.
* Use toggles to immediately activate or deactivate something. 
* Toggles should be easily identifiable. It should be visible at glance if a toggle has been selected, and it should be more visually prominent than unselected items.

### Toasts*
Toasts display brief, temporary notifications (usually a success or error feedback). They are meant to be noticed without disrupting a user's experience or requiring an action to be taken.

* Toasts should communicate to the user whether an action was successful or not. Do not use toasts for other purposes.  
* Display toasts just long enough for the user to read the content (usually a few seconds).
* Keep toast copy short.
* Optionally allow the user to dismiss the toast.

### Tooltips*
Tooltips display progressively disclosed informative text when users hover over or clicks an element.

* When activated, tooltips display a text label identifying an element, such as a description of its function.
* We display tooltips on hover if they’re read-only. If they include some kind of action, display the tooltip on click. 
* Tooltips are temporal. Tooltips appear on hover or click, and disappear after a short duration.
* Tooltips are contextual. Tooltips are always paired near the element with which they are associated.
* Tooltip text should be concise. Tooltips should only include short, descriptive text. For longer-form  progressively disclosed information, display a modal. 
* Tooltips can be multi-row. In the case of data visualization, each element should be stacked on top of each other with the value clearly indicated above associated tags or other content. 
