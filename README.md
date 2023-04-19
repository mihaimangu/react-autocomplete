# react-autocomplete
An app that displays two react autocomplete components. They look the same but they handle data differently. 
# How to use

At the time of writing, node `v18.12.0` was used. This app displays two react "autocomplete" components. The first one grabs data from an endpoint from `https://jsonplaceholder.typicode.com` (check `services/api.tsx`). The second one calls an endpoint using a query (q) param in order to filter data. 

In other words, the first one is filtering client side, while the second one is filtering server side. Please use the network tab in the dev tools in order to see the differences.

# How to start the app

1. npm install
2. In order to start the local express server, use `npm run server`
3. In order to start the react FE server, use `npm start`
4. Test both components

# What components to inspect.

- The `container` component is the parent component that renders the two `AutoComplete` and `AutoCompleteInternal` components. It also grabs the data when the component mounts.

- The `AutoComplete` component uses the data that is already fetched when the `container` mounts. It filters the data using regex. Check `suggestItems`. 

- The `AutoCompleteInternal` component is different, in the sense that it filters the data by calling an endpoint using the `getData` prop. 

- The `server.js` is used in order to serve the endpoints. It uses the data from `items.json` (no need for a database).




