# Design Guidelines

## Widgets
Widgets are Dashboard tile components filled with graphs or other information. The user can create a widget instance by dragging the widget tray card onto the board, selecting the editing options, and confirming. Widgets can be resized and resorted manually by the user. 


**Widgets should be responsive with no horizontal scrolling and the most important information above the fold.**
By default, UI-extension widgets have a ratio of 2x1 and will take up a third of the board. The widget can be resized to take up the full width of the board or at a minimum 1/6th the board. The extension must resize to fit these varying horizontal widths. 

![widget 1](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/xQu7r6OL/6cc28c6a-d59d-4aa9-83eb-0f64a09de36a.png?source=viewer&v=10a44f3b1ea2fe3bc61da72bd46df74d)



**Widgets can have vertical scrolling.**

![widget 1](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/yAurOyAr/c4955786-4523-4d8e-8ad2-bb9a0781b702.png?source=viewer&v=a94210b1d412d0ca6fc05618dae2193d)


**Widgets shouldn’t have multi-level views.** No modals within the tile or paginated views. If your widget is complex and needs this kind of functionality, display a call to action that drives the user to a separate side panel or modal ui-extension. 

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/4gunol4K/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/4gunol4K/70624f04-a990-4e01-b57b-fad5de9229f8.png?source=thumbnail&v=c1b4fcd5af996f841d0ca84c8ee65e83)


**Widget logos should be high quality.** Logos should be svgs with a dimension of 128px x 128px.

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/z8uOzrlb/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/z8uOzrlb/1cb69940-1885-498f-a11d-2a91924d1261.png?source=thumbnail&v=0c1ff73d1b7aee731bc74b8362948090)

**Widgets should have default editing options selected on creation.** Widgets shouldn’t have empty states.

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/Z4uKgjm9/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/Z4uKgjm9/62f9ca4c-bf07-430c-bb8a-1da132f771e0.png?source=thumbnail&v=de9b321dbad0c13e6c8509d90be6dc71)


**Clicks that trigger other side panels, modals, or external pages to open should always be paired with a clear call to action.** If the user is going to an external page, there should be a signifier to the user that the link will push them to another website. If the click opens a modal or a side panel, the link should communicate this. Exception: If the click triggers a context menu to open from a graph datapoint, no call to action is needed on the tile. 

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/P8u9BGNo/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/P8u9BGNo/753ff0c5-c452-4de6-8b90-de79b5625d57.png?source=thumbnail&v=9ff280169652876b4a5bc6661bc03a5b)


**Clicks that trigger actions within the tile should give the user proper feedback.**

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/OAuQ5n2p/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/OAuQ5n2p/e3b63f2b-ad69-4905-85f6-793cc2aaf27b.png?source=thumbnail&v=79b465dd35123cbd973cd80c541f6226)


**Content within the widget should have good contrast and clear hierarchy so that the information is easily understood.** Titles should have larger or bolder fonts than subtitles or body copy. Fonts and colors should be simplified and intentional. Information that’s related should be grouped together with proper spacing and color/shade contrast.  

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/E0uAkjXr/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/E0uAkjXr/e6c2aeed-03c4-4c6d-aebb-856ffef5f302.png?source=thumbnail&v=fd9bf1b0bbf31ec2e90cfd925ce054e4)

## Side Panels
Side panels display contextual information in a panel that slides out from the right edge of the viewport. They are often used in conjunction with other ui-extensions. e.g. a user clicks on a link in a widget or a context menu which opens a side panel.

**Side panels should be responsive with no horizontal scrolling and the most important information above the fold.**

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/kpuDgnWj/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/kpuDgnWj/7dd020e0-f292-4e61-bc35-c2287dcc7a71.png?source=thumbnail&v=31710d102bd021da458ac358089d3ef8)

**Side panels can have vertical scrolling.**

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/X6uAplQZ/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/X6uAplQZ/8cbaedfe-bfed-4111-a583-dfba27436ebb.png?source=thumbnail&v=d6b89c14971d0bbd12408d25c9c458c8)

**Side panels can have multi-level views but no modals. If the side panel requires multiple views or pagination, there should be breadcrumbs to aid the user in navigating back to the landing view.**

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/GGuWYpJP/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/GGuWYpJP/f6256f74-6fb5-494d-a047-260c724d2b5f.png?source=thumbnail&v=18ba4f093d88cb3c51c3a360d6b7b045)

**Clicks that trigger other side panels, modals, or external pages to open should always be paired with a clear call to action.** If the user is going to an external page, there should be a signifier to the user that the link will push them to another website. If the click opens a modal or a side panel, the link should communicate this.

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/rRuj2b5X/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/rRuj2b5X/e023720f-0ffd-4139-877a-5bce644a08c6.png?source=thumbnail&v=4fc606db981229542fa462abe354d6d8)


**Content within the side panel should have good contrast and clear hierarchy so that the information is easily understood.** Titles should have larger or bolder fonts than subtitles or body copy. Fonts and colors should be simplified and intentional. Information that’s related should be grouped together with proper spacing and color/shade contrast.

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/QwuAg5jQ/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/QwuAg5jQ/f4153eea-0a70-47c8-93b4-a3bc781fd36b.png?source=thumbnail&v=072b67151c833fb19455834d6b92fd6a)

## Modals
Overlay that appears atop the entire page and prevents interaction elsewhere until some kind of action is taken. They are often used in conjunction with other ui-extensions. e.g. a user clicks on a link in a widget or a context menu which opens a modal. 

**Modals should be responsive with no horizontal scrolling and the most important information above the fold.**

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/8Luo850v/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/8Luo850v/027e3717-92ff-480f-8317-64fcdd0a28f4.png?source=thumbnail&v=5f001d5f16d93036ea82716b517b93d1)


**Modals can have vertical scrolling.**

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/E0uAkjZr/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/E0uAkjZr/debc8af8-07dc-4076-b2a6-32bbb3dd6ff7.png?source=thumbnail&v=cff1ed49d4ce6990a62046ec5b1dc73c)


**Modals shouldn’t have multi-level views.** No modals within a modal or paginated views. If your modal is complex and needs this kind of functionality, display a call to action that drives the user to a separate side panel or modal ui-extension or use the side panel ui-extension instead. 

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/7KuoOEkq/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/7KuoOEkq/3c043caa-65d2-4339-a7c4-a07948fdff2e.png?source=thumbnail&v=3650d9c881f575c3380405648cc109e4)


**Clicks that trigger other side panels, modals, or external pages to open should always be paired with a clear call to action.** If the user is going to an external page, there should be a signifier to the user that the link will push them to another website. If the click opens a modal, side panel, or widget, the link should communicate this. 

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/z8uOzrQb/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/z8uOzrQb/87b04cea-0173-4933-9f3d-aaa8dbebbf19.png?source=thumbnail&v=6e68b4d367d0f92a45f923b522920e7d)


**Content within the modal should have good contrast and clear hierarchy so that the information is easily understood.** Titles should have larger or bolder fonts than subtitles or body copy. Fonts and colors should be simplified and intentional. Information that’s related should be grouped together with proper spacing and color/shade contrast.  

![widget 1](https://d6pdqlw297isz.cloudfront.net/i/mXureK2X/0x400/p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/mXureK2X/06612d6d-b4c7-4f40-b88e-c7b08eb2d39f.png?source=thumbnail&v=fd9bf1b0bbf31ec2e90cfd925ce054e4)