export const abi = [
	{ inputs: [], stateMutability: "nonpayable", type: "constructor" },
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "uint256", name: "_lastGame", type: "uint256" },
			{ indexed: true, internalType: "uint256", name: "_game", type: "uint256" }
		],
		name: "_changeCurrentGame",
		type: "event"
	},
	{ anonymous: false, inputs: [], name: "_initCycle", type: "event" },
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "_from", type: "address" },
			{ indexed: true, internalType: "uint256", name: "_game", type: "uint256" },
			{ indexed: false, internalType: "uint256", name: "_value", type: "uint256" }
		],
		name: "_joinDown",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "_from", type: "address" },
			{ indexed: true, internalType: "uint256", name: "_game", type: "uint256" },
			{ indexed: false, internalType: "uint256", name: "_value", type: "uint256" }
		],
		name: "_joinUp",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "_from", type: "address" },
			{ indexed: true, internalType: "uint256[]", name: "_game", type: "uint256[]" },
			{ indexed: false, internalType: "uint256", name: "_value", type: "uint256" }
		],
		name: "_reward",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "_address", type: "address" },
			{ indexed: false, internalType: "uint256", name: "_value", type: "uint256" }
		],
		name: "_rewardAdmin",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [{ indexed: true, internalType: "uint256", name: "update", type: "uint256" }],
		name: "_setIntervalTime",
		type: "event"
	},
	{ anonymous: false, inputs: [{ indexed: true, internalType: "uint256", name: "_game", type: "uint256" }], name: "_updateTreasury", type: "event" },
	{
		inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		name: "Games",
		outputs: [
			{ internalType: "uint256", name: "upAmount", type: "uint256" },
			{ internalType: "uint256", name: "downAmount", type: "uint256" },
			{ internalType: "uint256", name: "totalAmount", type: "uint256" },
			{ internalType: "uint256", name: "rewardAmount", type: "uint256" },
			{ internalType: "uint256", name: "rewardPoolAmount", type: "uint256" },
			{ internalType: "bool", name: "rewardCalculated", type: "bool" },
			{ internalType: "uint256", name: "endTimestamp", type: "uint256" },
			{ internalType: "int256", name: "priceEnd", type: "int256" }
		],
		stateMutability: "view",
		type: "function"
	},
	{ inputs: [], name: "NextCurrentGame", outputs: [], stateMutability: "nonpayable", type: "function" },
	{ inputs: [], name: "admin", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "currentGameId", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "feesAmount", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
	{ inputs: [], name: "feesRate", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
	{
		inputs: [],
		name: "getCurrentPrice",
		outputs: [{ internalType: "int256", name: "_price", type: "int256" }],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [{ internalType: "address", name: "_user", type: "address" }],
		name: "getUserAvailableWins",
		outputs: [{ internalType: "uint256[]", name: "_winGames", type: "uint256[]" }],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [{ internalType: "address", name: "_user", type: "address" }],
		name: "getUserGames",
		outputs: [{ internalType: "uint256[]", name: "games", type: "uint256[]" }],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [{ internalType: "address", name: "_user", type: "address" }],
		name: "getUserTotalAmount",
		outputs: [{ internalType: "uint256", name: "amountGames", type: "uint256" }],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [{ internalType: "address", name: "_user", type: "address" }],
		name: "getUserWinAmount",
		outputs: [{ internalType: "uint256", name: "_winAmount", type: "uint256" }],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [{ internalType: "address", name: "_user", type: "address" }],
		name: "getUserWins",
		outputs: [{ internalType: "uint256[]", name: "_winGames", type: "uint256[]" }],
		stateMutability: "view",
		type: "function"
	},
	{ inputs: [], name: "initCycle", outputs: [], stateMutability: "nonpayable", type: "function" },
	{
		inputs: [],
		name: "intervalSeconds",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{ internalType: "uint256", name: "idGame", type: "uint256" },
			{ internalType: "address", name: "_address", type: "address" }
		],
		name: "isWinner",
		outputs: [{ internalType: "bool", name: "_isWinner", type: "bool" }],
		stateMutability: "view",
		type: "function"
	},
	{ inputs: [], name: "joinDown", outputs: [], stateMutability: "payable", type: "function" },
	{ inputs: [], name: "joinUp", outputs: [], stateMutability: "payable", type: "function" },
	{
		inputs: [{ internalType: "uint256[]", name: "idGames", type: "uint256[]" }],
		name: "reward",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [{ internalType: "address payable", name: "_address", type: "address" }],
		name: "rewardAdmin",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [{ internalType: "uint256", name: "_intervalSeconds", type: "uint256" }],
		name: "setIntervalSeconds",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{ internalType: "address", name: "", type: "address" },
			{ internalType: "uint256", name: "", type: "uint256" }
		],
		name: "userGames",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{ internalType: "uint256", name: "", type: "uint256" },
			{ internalType: "address", name: "", type: "address" }
		],
		name: "users",
		outputs: [
			{ internalType: "uint256", name: "amount", type: "uint256" },
			{ internalType: "uint8", name: "poolChoice", type: "uint8" },
			{ internalType: "bool", name: "claimed", type: "bool" }
		],
		stateMutability: "view",
		type: "function"
	}
]
