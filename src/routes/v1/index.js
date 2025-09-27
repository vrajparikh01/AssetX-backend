const express = require('express');
const usdcTokenRoute = require('./contract/erc20Token.route');
const signTransactionRoute = require('./signTransaction.route');
const rwaTokenRoute = require('./contract/rwaToken.route');
const stoRoute = require('./contract/sto.route');
const uniswapRoute = require('./contract/uniswap.route');
const pinataRoute = require('./pinata.route');
const launchpadRoute = require('./contract/launchpad.route');
const router = express.Router();

const contractRoutes = [
    {
        path: '/contract/erc20-token',
        route: usdcTokenRoute,
    },
    {
        path: '/contract/rwa-token',
        route: rwaTokenRoute,
    },
    {
        path: '/contract/sto',
        route: stoRoute,
    },
    {
        path: '/contract/uniswap',
        route: uniswapRoute,
    },
    {
        path: '/pinata',
        route: pinataRoute,
    },
    {
        path: '/contract/launchpad',
        route: launchpadRoute,
    }
];

const defaultRoutes = [
    {
        path: '/sign-transaction',
        route: signTransactionRoute,
    },
    ...contractRoutes,
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
