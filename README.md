# react-autocomplete
An app that displays two react autocomplete components. 

# How to use

At the time of writing, node `v18.12.0` was used. This app displays two react "autocomplete" components. The first one grab data from an endpoint from `https://jsonplaceholder.typicode.com` (check `services/api.tsx`). The second one calls an endpoint using a query (q) param in order to filter data. 

In other words, the first one is filtering client side, while the second one is filtering client side. Please use the network tab in the dev tools in order to see the differences.

# How to start the app

1. npm install
2. In order to start the local express server, use `npm run server`
3. In order to start the react FE server, use `npm start`
4. Test both components





