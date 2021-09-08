# UI-Extension Design Guidelines # 

## Table of Contents
* [Visual Design](#visual_design) 
* [User Interaction & Communication](#user_interaction)
* [Components](#components)
* [UI-Extension Best Practices](#ui_extension)
     

## Visual Design <a name="visual_design"></a>

### Typography 
* **Emphasize important information.** Use font weight, size, and color to highlight the most important information.
* **Minimize the number of typefaces you use.** Mixing too many distinct typefaces can make your app seem fragmented and sloppy.
* **Use headlines for short and important text.** Subtitles are smaller than headlines.
* **Use subtitles for medium-emphasis text that’s shorter in length.**
* **Use body copy for long-form writing.**
* **Keep button text readable and short.** Don’t use expressive fonts as button text, including display, handwritten, and script styles. Copy should be specific but to the point.
* **Don’t use serif fonts.** Only use sans-serif.

### Logos
* **Widget logos should be high quality.** Logos should be svgs with a dimension of 128px x 128px.
* **We recommend adding a darkmode and lightmode logo via the repository.** The darkmode logo should be white and the lightmode logo should be in color. View other dark mode guidelines here.  

### Color
* **Color should be hierarchical.** Color indicates which elements are interactive, how they relate to other elements, and their level of prominence. Important elements should stand out the most.
* **Use color sparingly for communication.** In general, color should be used thoughtfully, like when you need to call attention to important information. For example, a red triangle that warns people of a critical problem becomes less effective when you use red elsewhere in an app for noncritical reasons.
* **Don’t use colors that make it diffucult for people to perceive the content.** For example, color blind people might not be able to distinguish some color combinations, and insufficient contrast can cause icons and text to blend with the background and make content hard to read.
* **Use text size to help determine color contrast.** In general, smaller or lighter-weight text needs to have greater color contrast to be legible.
* **When determining a color system, define one color for the following:**

    Primary Color  | Secondary Color | Disabled Color | Error Color | Primary Text Color | Secondary text color
    :-------------  | :--------------- | :------------- | :------------ | :------------------ | :--------------------
    Used for call to actions and links. | A secondary color provides more ways to accent and distinguish your product. | Used for elements that are normally interactive but are read-only. | Indicates errors in components, such as invalid text in a text field. | Used for headlines and important text.| Used for body copy and less emphasized text.

### Dark Mode
A significant percentage of our user base uses dark mode. We recommend making a dark mode version of your app to ensure these users have a high-quality experience. You can define the color theme in the GitHub repository with the attribute `colorTheme` (`dark` or `light`).

* **Avoid pure black.** Dark gray surfaces reduce eye strain — light text on a dark gray surface has less contrast than light text on a black surface. 
* **Make colors lighter and desaturated.** Saturated colors can visually vibrate against dark surfaces, making them harder to read. Use lighter tones (colors in the 200–50 range) because they have better readability on darker surfaces.
* **Test your design in both light and dark appearances.** See how your interface looks in both appearances, and adjust your designs as needed to accommodate each one. Decisions that work well in one appearance might not work in the other. 
* **Soften the color of white backgrounds.** If you must use a white background for your content in Dark Mode, choose a slightly darker white that prevents the background from glowing against the surrounding dark content.

### Accessibility
We recommend that your app makes as best an effort as possible to comply with  WCAG 2.1 AA standards. View the latest published standards regarding [perceivability](https://www.w3.org/WAI/WCAG21/quickref/#principle1/ "perceivability"), [operability](https://www.w3.org/WAI/WCAG21/quickref/#principle2/ "operability"), and [understandability](https://www.w3.org/WAI/WCAG21/quickref/#principle3/ "understandability"). 

We recommend you use the tool [Lighthouse](https://developers.google.com/web/tools/lighthouse#devtools/ "Lighthouse") to check the performance of your app. 

## User Interaction & Communication <a name="user_interaction"></a>
### Authentication & Authorization
Datadog handles authentication and authorization. No work is needed on your end to ensure they’re working properly. 

### Formatted Time
Datadog uses [date-fns](https://date-fns.org "date-fns") for time conventions. It’s important to note that time zones are a Datadog user setting that can override your default settings. 

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

### Data Entry
* **Simplify navigation of value lists.** In controls like tables and dropdowns, make it easy to locate a specific value. Consider sorting values alphabetically or in another logical manner that facilitates speedy scanning and selection.
* **Use an introductory label or placeholder text to help communicate purpose.** A label helps users understand what type of information they should enter. A text field can also contain placeholder text—such as Email or Password—when there’s no other text in the field. A label is often unnecessary when placeholder text is present. Generally, labels should use title-style capitalization while placeholder text should use sentence-style capitalization.
* **Consider using an expansion tooltip to show the full version of clipped or truncated text.** An expansion tooltip behaves like a help tag and appears when the user places the cursor over the field.
* **Use a number formatter to aid with numeric data entry.** A number formatter automatically configures the text field to accept only numeric values. It can also be set to display the value in a specific way, such as with a certain number of decimal places, as a percentage, or as currency.
* **Enable advancement only after collecting required values.** Before enabling a Next or Continue button, make sure all required fields have values. The enabled button provides a visual cue that it’s OK to proceed.
    
### Data Visualization
Data visualization portrays information graphically which makes it easy to compare and make decisions surrounding data. The type of chart you use should depend on what you’d like users to do with the data.

* **The presentation of the data should be accurate.** Make sure the way the data is presented isn’t distorted. 
* **Progressively disclose additional details.** The user should be able to hover over a datapoint and receive additional context via a tooltip. e.g. a description/value.
* **Surface up legends.** Place legends below charts so users can understand the graph.
* **Incorporate zooming and panning if needed.** Zooming changes whether the UI is shown from either nearer or farther away.  Zoom occurs through clicking and dragging, or scrolling. Panning allows the user to explore the UI that expands beyond the screen. Panning and zooming are often paired together.
* **Don’t bold too many typographical elements.** Bolding too many typographical elements makes it difficult for users to scan text. 
* **Don’t solely rely on icons to convey important information.** Icons alone might not be intuitive enough for users to understand the meaning. 


If users need to see **changes over time** use:

Image | Name | Description
:------------- | :------------- | :-------------
Placeholder | Line Charts  |  To express minor variations in data.
Placeholder | Bar Charts  | To communicate changes over time and how individual data points relate to a whole or compare to one another.
Placeholder  | Stacked Bar Charts | To express larger variations in data and to break down and compare parts of a whole.
Placeholder  | Area Charts | To summarize minor variations in data. The space between the x-axis and line is filled. 
Placeholder  | Timelines | To communicate a series of events over time. 
Placeholder  | Horizon charts | To express several stacked line or area charts. 
Placeholder  | Waterfall charts | To communicate the cumulative effect of positive or negative values over time.


If users need to see **compare datapoints** use:

Image | Name | Description
:------------- | :------------- | :-------------
Placeholder  | Bar Charts  | To communicate changes over time and how individual data points relate to a whole or compare to one another.
Placeholder  | Bubble Charts | To express the relationship between three dimensions of data (x axis, y axis, and bubble size).
Placeholder  | Multi-line Charts | To summarize minor variations in data. The space between the x-axis and line is filled. 
Placeholder  | Parallel Coordinate Charts | To compare many variables and uncover the relationships between them. Each variable is given its own axis and all the axes are placed in parallel to each other. 
Placeholder  | Bullet Charts | To compare the performance of a primary measure to one or more other measures.
 

If users need to see **how elements add up to a total** use:

Image | Name | Description
:------------- | :------------- | :-------------
Placeholder  | Stacked Bar Charts | To express larger variations in data and to break down and compare parts of a whole.
Placeholder  | Pie Charts | To communicate percentages of a whole.
Placeholder  | Stacked Area Charts | To track minor variations of data across groups and to see how those breakdowns contribute to a total. 
Placeholder  | Tree Map Charts | To visualize hierarchical data using nested figures, usually rectangles. 


If users need to see how an **item ranks in comparison to others** use :

Image | Name | Description
:------------- | :------------- | :-------------
Placeholder  | Ordered bar charts | To communicate changes over time and how individual data points compare to one another. The bars are rank ordered.
Placeholder  | Parallel coordinate charts | To compare many variables and uncover the relationships between them. Each variable is given its own axis and all the axes are placed in parallel to each other.


If users need to see how often a **value occurs in a dataset**:

Image | Name | Description
:------------- | :------------- | :-------------
Placeholder  | Histogram charts | To depict the distribution of a dataset: how often values fall into ranges. Values are grouped into bins and the bins are displayed as segmented columns. 
Placeholder  | Box plot charts | To compare medians, ranges and variabilities effectively and across groups of different sizes. 
Placeholder  | Violin charts | To visualise the distribution of data and its probability density. The width communicates the data’s frequency across upper, median, and lower ranges. 
Placeholder  | Density charts | To visualise the distribution of data over a continuous interval or time period.


If users need to see how **multiple items relate to one another**:

Image | Name | Description
:------------- | :------------- | :-------------
Placeholder  | Network charts | To show relationships between a group of entities through the use of nodes / vertices and link lines.
- | Venn diagrams | To show the commonalities and differences among things or groups of things through circles that overlap or don't overlap. 


If users need to see **movement of data across multiple states**:

Image | Name | Description
:------------- | :------------- | :-------------
Placeholder  | Sankey charts | To visualize the flow from one set of values to another. Use when you want to show a many-to-many mapping between two domains or multiple paths through a set of stages. 
Placeholder  | Gantt charts | To show activities (tasks or events) displayed against time. 
Placeholder  | Network charts | To show relationships between a group of entities through the use of nodes / vertices and link lines.


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

### Buttons
Buttons communicate actions that users can take. They are typically placed in the UI to save/confirm/edit/delete or drill into an action or resource. 

* **Buttons should be identifiable and clear.** Buttons should indicate that they can trigger an action with clear copy (we recommend using verbs or leading with them) and color to indicate they’re clickable. 
* **Buttons should be findable.** Buttons should be easy to find among other elements, including other buttons.
* **Don’t overuse primary buttons.** We recommend having one clear call to action whenever possible.
* **Don’t wrap button text.** For maximum legibility, a text label should remain on a single line.

When defining a button system, consider the following:

Image | Name | Description
:------------- | :------------- | :-------------
Placeholder | Primary button | A button that has a fill. The most important call to action. 
Placeholder | Secondary button | A button that has an outline. Use for actions that are of medium importance.  
Placeholder | Tertiary button | A de-emphasized button that has text styling. Use for less important actions. 
Placeholder | Icon (optional) | A button can have an icon solely or in conjunction with text. We caution against the use of an icon only unless the icon is universal (e.g., a trash can to indicate a destructive action). 

Buttons states:

Image | State | Description
:------------- | :------------- | :-------------
Placeholder | Enabled | An enabled button should look interactable.
Placeholder | Disabled | A disabled button should be greyed out. 
Placeholder | Hover | A button should have a more emphasized color or drop shadow to provide feedback to the user.
 
### Checkboxes
Checkboxes allow users to select one or more items from a set. Checkboxes can turn an option on or off. 

* **Checkboxes should be easily identifiable.** It should be visible at a glance if a checkbox has been selected, and selected items should be more visually prominent than unselected items.
* **Checkboxes should be used instead of toggles or radio buttons if there are multiple options and more than one can be selected.**
* **Use checkboxes over dropdowns if you’d like to expose all available options to the user.** 

### Tables
Tables display sets of data across rows and columns. They organize information in a way that’s easy to scan so that users can look for patterns and develop insights from data. We recommend using the open source table library datatables.net.

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

### Fields and Labels
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
Placeholder | Enabled | Not selected and active. 
Placeholder | Disabled | Read-only
Placeholder | Hover | A cursor is positioned over the field.
Placeholder | Selected | A user has clicked the field.
Placeholder | Error | A field’s text isn’t accepted and messaging is displayed below the field that communicates how to fix the error. 

Labels (optional):
* A label is a static text field that describes an onscreen interface element or provides a short message. 
* Placement of labels should be consistent within a layout. Either place all labels above a field or to the left. 
* Labels can have helper text that is progressively disclosed via a tooltip. 

### Loaders
Loaders inform the user of loading or computing processes being carried out by the system.

* Display a loader if the wait time is greater than a second. 
* Keep loaders at a reasonable size. No greater than 24px.

### Menus
Menus display a list of choices on temporary surfaces.

* **We recommend limiting the use of menus in widgets.** Do not use menus in widgets for anything more complicated than a simple select or read only content.
* **Menus should be easy to open, close, and interact with.**
* **Menu items should be easy to scan.** 
* **Menu height and placement should be considered if placed inside a widget.** They might cause usability issues – especially in relation to responsiveness. 
* **Consider allowing the user to scroll within a menu if placed inside a widget.** Otherwise, the menu might be hidden from view if the list is long. 

### Radio Buttons
Radio buttons allow users to select one option from a set.

* Use radio buttons over checkboxes if only one item can be selected.
* Use radio buttons over toggles if there are more than two options the user could select from.
* Use radio buttons over dropdowns if you’d like to expose all available options to the user. 
* Radio buttons should be easily identifiable. It should be visible at a glance if a radio button has been selected, and selected items should be more visually prominent than unselected items.

### Tabs
Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy. Use tabs if you’d like people to quickly access longer buckets of content that are of equal importance. 

* Each tab should contain content that is distinct from other tabs in a set.
* We caution against the use of many tabs within a widget because the user shouldn’t horizontally scroll within a widget tile. 
* Within the context of a modal or side panel, the user can horizontally scroll to view additional tabs.
* Selected tabs should feel distinct from deselected ones. 
* Tabs should look selectable with clear hover states. 

### Toggles
Toggles switch the state of a single item on or off.

* Use toggles over checkboxes if only one item can be selected.
* Use toggles over radio buttons if there are only two options the user could select from. e.g. on vs off.
* Use toggles to immediately activate or deactivate something. 
* Toggles should be easily identifiable. It should be visible at a glance if a toggle has been selected, and it should be more visually prominent than unselected items.

### Toast
Toasts display brief, temporary notifications (usually a success or error feedback). They are meant to be noticed without disrupting a user's experience or requiring an action to be taken.

* Toasts should communicate to the user whether an action was successful or not. 
* Display toasts just long enough for the user to read the content (usually a few seconds).
* Keep toast copy short.
* Optionally allow the user to dismiss the toast.
* Display a drop shadow behind the toast. 

### Tooltips
Tooltips display progressively disclosed informative text when users hover over or clicks an element.

* When activated, tooltips display a text label identifying an element, such as a description of its function.
* We recommend displaying tooltips on hover if they’re read-only. If they include some kind of action, display the tooltip on click. 
* Tooltips are temporal. Tooltips appear on hover or click, and disappear after a short duration.
* Tooltips are contextual. Tooltips are always paired near the element with which they are associated.
* Tooltip text should be concise. Tooltips should only include short, descriptive text. For longer-form  progressively disclosed information, display a modal. 
* Tooltips can be multi-row. In the case of data visualization, each element should be stacked on top of each other with the value clearly indicated above associated tags or other content. 

## UI-Extension Best Practices <a name="ui_extension"></a>

### Dashboard Cog Menu Items
Cog menus items surface up custom progressively disclosed links within the Dashboard’s settings menu that drive users to other ui-extensions or external sites. e.g. a user clicks on a cog menu item which opens up an external web page.

#### When to Use a Context Menu Item
Use a cog menu item when you’d like to drive the user to another ui-extension or external webpage and the action is more top-level. 

#### Best Practices
* Cog menu names should be clear and actionable. 
* Keep context menu names short and to the point so that the content doesn’t overflow onto a second line. 


### Dashboard Context Menu Items
Context menus help extend widget data visualizations by surfacing up custom progressively disclosed links to drive users to other content. They can be used in conjunction with other ui-extensions. e.g. a user clicks on a context menu item which opens up a side panel.

#### When to Use a Context Menu Item
Use a context menu item when you’d like to drive the user to another ui-extension or external webpage to learn more about a datapoint.

#### Best Practices
* Context menu names should be clear and actionable. 
* Keep context menu names short and to the point so that the content doesn’t overflow onto a second line. 
* Try to reduce the number of context menu items per app so that the context menu isn’t overloaded with rows. 


### Dashboard Modals
Modals are overlays that appear atop the entire page and prevent interaction elsewhere until some kind of action is taken. They are used in conjunction with other ui-extensions. e.g. a user clicks on a link in a widget which opens a modal.

#### When to Use a Modal
* Use a modal when you’d like to focus the user on resolving a specific task with clear confirm/cancel actions. 
* Use a modal if the background content (the dashboard) isn’t relevant or intended to be interactable. 

#### Scenarios
* **Completing a task:** Use a modal when you’d like to focus the user on a specific task that is coupled with  confirm/cancel actions. 
* **Confirming an action or alert** Use a modal when you’d like a user to confirm an action they just took or a consequence of an action. It may be paired with a warning or critical information related to that action. Confirmation isn't necessary when the consequences of an action are reversible or negligible. e.g. If a check mark shows an image has been selected, further confirmation is unnecessary.
* **Communicating an error** If an action a user took led to an error, modals can be used to surface up details about the error and give the user a chance to resolve it.  
* **Displaying lengthier help information** If the help information is relatively short, display it in a tooltip on hover instead.

#### Best Practices
* Modals should be responsive with no horizontal scrolling and the most important information above the fold.
* Modals can have vertical scrolling.
* Modals can have multiple views but the user must confirm each view as part of a linear flow with a clear back button.
* Don’t display a modal within a modal. 
* Clicks that trigger other side panels, modals, or external pages to open should always be paired with a clear call to action. 
* Use a clear signifier if a link pushes a user to an external page.
* Use the bottom footer of the modal to communicate actions the user can take on the task. 
* Have clear delineations between steps in the flow.
* Communicate to the user fields that are required vs optional.
* Display a toast once the task is completed. 

### Dashboard Side Panels
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

### Dashboard Widgets
Widgets are Dashboard tile components filled with graphs or other information. The user can create a widget instance by dragging the widget tray card onto the board, selecting the editing options, and confirming. Widgets can be resized and resorted manually by the user.

#### Widget Tray Token
To get a widget instance onto a dashboard, the user has to drag the widget tray token onto the board. If your app has many widgets, each widget will appear in the tray as a separate token. A widget tray token consists of a name and the logo (light or dark). 

* Keep the widget tray name short and to the point so it doesn't wrap to two lines. 
* Name the app something that’s relevant to the core value proposition of the feature. e.g. Datadog Action Items. 

#### Widget Editing Options
Editing options control facets of a widget instance such as the widget name or the environment. When the user drags a widget tray token onto the board, the user is prompted to confirm the editing options. The user can update the editing options by clicking on the edit pencil in a given widget instance. 

* We recommend having defaults for all selections. 

#### Scenarios
* **Visualizing data** Review our data visualization section within user interaction & communication to learn more about our recommendations. Widgets with data visualization should scale vertically and avoid scrolling.   
* **Displaying action items** We recommend using a table to improve the users ability to quickly find and resolve action  items. Review our table section within ucomponents to learn more about our recommendations. Widgets with tables shouldn’t scale vertically and should scroll.   
* **Complex Scenarios** Don’t display multiple tiles/cards within a widget. Instead, make each tile/card it’s own widget. Try to limit the number of widgets to something reasonable like 2-3. 

#### General Best Practices
* **Keep the experience within the widget tile as simple as possible.** Don’t display multiple views or complex progressively disclosed components within the tile. 
* **Avoid displaying overlays like modals, popovers, and toasts in the widget with the exception of tooltips or simple select menus.** If you need to confirm an action, use an inline confirmation rather than a toast.
* **If a task requires more than a click of a button to resolve, push the user to a ui-extension modal or sidebar to resolve the task.**
* **Widgets should be responsive with no horizontal scrolling and the most important information above the fold.** By default, UI-extension widgets have a ratio of 2x1 and will take up a third of the board. The widget can be resized to take up the full width of the board or at a minimum 1/6th the board. The extension must resize to fit these varying horizontal widths.
* **Clicks that trigger actions within the tile should give the user proper feedback.** Display a time series tooltip when a user clicks into a graph.  
