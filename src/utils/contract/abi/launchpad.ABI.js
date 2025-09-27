module.exports = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'OwnableInvalidOwner',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'OwnableUnauthorizedAccount',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'country',
                type: 'string',
            },
        ],
        name: 'addCountry',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'industry',
                type: 'string',
            },
        ],
        name: 'addIndustry',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'investmentType',
                type: 'string',
            },
        ],
        name: 'addInvestmentType',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'stoToken',
                type: 'address',
            },
        ],
        name: 'claimBaseToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'stoToken',
                type: 'address',
            },
        ],
        name: 'claimTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'claimedStoToken',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'details',
        outputs: [
            {
                internalType: 'string',
                name: 'overview',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'companyWebsite',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'issuer',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'country',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'industry',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'investmentType',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'image',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getAllSTO',
        outputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'stoToken',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'baseToken',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'softCap',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'hardCap',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'minInvestment',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'maxInvestment',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'startTime',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'endTime',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenClaimTime',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenPriceStoToken',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenPriceBaseToken',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'raisedAmount',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct Launchpad.stoListing[]',
                name: '',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'investor',
                type: 'address',
            },
        ],
        name: 'getInvestment',
        outputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'stoToken',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct Launchpad.investment[]',
                name: '',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'getSTOTokens',
        outputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'stoToken',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'baseToken',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'softCap',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'hardCap',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'minInvestment',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'maxInvestment',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'startTime',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'endTime',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenClaimTime',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenPriceStoToken',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenPriceBaseToken',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'raisedAmount',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct Launchpad.stoListing[]',
                name: '',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getValidCountries',
        outputs: [
            {
                internalType: 'string[]',
                name: '',
                type: 'string[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getValidIndustries',
        outputs: [
            {
                internalType: 'string[]',
                name: '',
                type: 'string[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getValidInvestmentType',
        outputs: [
            {
                internalType: 'string[]',
                name: '',
                type: 'string[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'stoToken',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'invest',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'investments',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'investorCount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'isClaimedRaisedFund',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'country',
                type: 'string',
            },
        ],
        name: 'isValidCountry',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'industry',
                type: 'string',
            },
        ],
        name: 'isValidIndustry',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'investmentType',
                type: 'string',
            },
        ],
        name: 'isValidInvestmentType',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'stoToken',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'baseToken',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'softCap',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'hardCap',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'minInvestment',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'maxInvestment',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'startTime',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'endTime',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenClaimTime',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenPriceStoToken',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenPriceBaseToken',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'raisedAmount',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct Launchpad.stoListing',
                name: 'stoDetail',
                type: 'tuple',
            },
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'overview',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'companyWebsite',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'issuer',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'country',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'industry',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'investmentType',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'image',
                        type: 'string',
                    },
                ],
                internalType: 'struct Launchpad.stoDetails',
                name: 'stoInfo',
                type: 'tuple',
            },
        ],
        name: 'listSTO',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'listings',
        outputs: [
            {
                internalType: 'address',
                name: 'stoToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'baseToken',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'softCap',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'hardCap',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'minInvestment',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'maxInvestment',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'endTime',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'tokenClaimTime',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'tokenPriceStoToken',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'tokenPriceBaseToken',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'raisedAmount',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'stoTokens',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'validCountries',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'validIndustries',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'validInvestmentType',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'stoToken',
                type: 'address',
            },
        ],
        name: 'withdrawBaseToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'stoToken',
                type: 'address',
            },
        ],
        name: 'withdrawSTOToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
