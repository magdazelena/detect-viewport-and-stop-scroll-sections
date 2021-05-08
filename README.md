# Scrolling sections with enter-leave monitoring and stop-scroll option
### Overview 
Sample site divided by sections. Entry and leave screen state can be monitored for each section. A section can be selected as manual, that when entering this section scrolling would stop and resumed on press of a button.

### ReactJS application
Using:
1. Styled components with looped colors
2. Intersection observer for monitoring viewport 
3. Stop-scrolling behavior while monitoring state

## How it works
This is an example of implementation logging state of the section.

### Container
`Container` element is used only for logging state of the function. It binds logging method `onVisibilityChange` to all its children. This method has first parameter of isVisible, which can be used to determine whether this child is in viewport or not.

### Section
`Section` uses `react-intersection-observer` to determine whether component is in viewport and by how much. The threshold is specified in the `useInView` hook as per dependency documetation.

#### Stop-scroll behavior
`Section` may have a `manual` parameter which enforces the stop scroll when function is in viewport. 
When `manual` parameter is there and section appears in viewport, async function `scrollToPosition` is triggered which returns a promise. The function scrolls to the manual section and stops scroll on callback.
Stop scroll actually happens with state change. `Stop scroll` and `resume scroll` functions change the state, being value of `y` position of manual section in the document. `useEffect` hook on the `y` state adds and removes event listener on scroll behavior. When listener is added, `monitor scroll` function scrolls to `y` on each trigger of the scroll event - which seems like we are not scrolling at all. Scrolling is resumed by `resume scroll` function attached to a button, which sets the `y` value to null, resulting in no scrollTo trigger. 