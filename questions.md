# What is the difference between Component and PureComponent? 

The difference between a React `component` and `PureComponent` is the fact that the second one does not re-render when the props are the same. `PureComponent` should not be used anymore because it's a class component, not a function component (`memo` can be used with a function component).

# Context + ShouldComponentUpdate might be dangerous. Can think of why is
that?

While context is used in order to pass data to certain components, that can be a problem in the sense that a component can re-render if not relevant props change. You could use `shouldComponentUpdate` in order to prevent that, but that might lead to issues, in the sense that you might end up in a situation when you are preventing a component to be rerendering, that actually needs to be rendered. So `shouldComponentUpdate` can be a double-edged sword.

# Describe 3 ways to pass information from a component to its PARENT.

One method to pass information from a children to a parent is by using the props, and passing a function as a prop to the child component. Another method is to use `Context`. A third method would be use a library like `Redux` to manage state.

# Give 2 ways to prevent components from re-rendering.

As described above, you prevent a component from being re-render by using a PureComponent. If you are using functional compoments, you can use memo in order to prevent a component from being re-rendered (if the props are the same). The memo function accepts a second parameter, in which you can write custom logic for preventing re-renders. 

# What is a fragment and why do we need it? Give an example where it might break my app.

A react fragment is basically like a wrapper for our various JSX elements. It can be used in order to wrapp multiple elements (basically like a `div`). We can generate an error and break the app if the elements inside the fragment are not valid. 

# Give 3 examples of the HOC pattern.

There are various example of HOC components. The `memo()` is an example of such component. `connect()` from `react-redux` is an example of such component.  


# what's the difference in handling exceptions in promises, callbacks and
async...await.

Each concept requires a different approach. For promises you add a `.catch` after your promise. Inside a callback function, you can handle an exception in an `if` statement. For async/await I use `try{} catch{}` blocks.

# How many arguments does setState take and why is it async.

setState takes 2 parameters. The first one is an object containing a key and a value (one or more keys if you want). The second parameter is a callback function. That second param can be used because setState is async and you can execute that callback function after the state has been changed. Why is it async? Because it doesn't happen instantly. setState is part of the react api and internally it does various computations in order to change the object.

# List the steps needed to migrate a Class to Function Component.

I don't think there is a simple blueprint for migrating a class component to a function component. First of all, we need to take into consideration various aspects like timeline events. Timeline events are `componentDidMount` or `componentWillMount`. These should be converted to the appropiate hooks. For timeline events, we use hooks like `useEffect`. For changing the state, we use the `useState` hook. 

Next, we need to change the methods to properties (let/const). We need to be careful about `.this` since it doesn't apply anymore. 

We also don't have a render method anymore. Instead, we simply `return` the desired JSX.

# List a few ways styles can be used with components.

You can use imports and use CSS files like `.css` or `.scss`. Or you can use styled components in order to change the looks of a component. 

CSS can also be used globally, with a single CSS or SCSS file.

# How to render an HTML string coming from the server.

After grabbing the HTML coming from a server, we need to make sure that it's valid. We can use a function for that. After doing that, we can set that HTML to an element using `dangerouslySetInnerHTML`

