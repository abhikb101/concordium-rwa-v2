// This file was generated by the build script. Do not edit it manually.
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* tslint:disable:no-unused-variable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { RJSFSchema, RegistryWidgetsType, UiSchema } from "@rjsf/utils";
import React from "react";
import { ContractAddress } from "@concordium/web-sdk";
import { default as client } from "./securityP2PTrading";
import * as types from "./securityP2PTrading";
import {
	GenericInit,
	GenericInvoke,
	GenericUpdate,
} from "../GenericContractUI";
export const initRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Init Request",
	properties: {
		token: {
			type: "object",
			title: "Token",
			properties: {
				contract: {
					type: "object",
					title: "Contract",
					properties: {
						index: { type: "integer", minimum: 0 },
						subindex: { type: "integer", minimum: 0 },
					},
				},
				id: { type: "string", title: "Id", default: "", format: "byte" },
			},
		},
		currency: {
			type: "object",
			title: "Currency",
			properties: {
				contract: {
					type: "object",
					title: "Contract",
					properties: {
						index: { type: "integer", minimum: 0 },
						subindex: { type: "integer", minimum: 0 },
					},
				},
				id: { type: "string", title: "Id", default: "", format: "byte" },
			},
		},
	},
};
export type initRequestUi = {
	token: { contract: { index: number; subindex: number }; id: string };
	currency: { contract: { index: number; subindex: number }; id: string };
};
export const initErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Init Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"Unauthorized",
				"Cis2CallError",
				"InvalidToken",
				"SellPositionExists",
				"SellPositionMissing",
				"InvalidConversion",
				"InvalidAmount",
				"LogError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CallError"] },
						Cis2CallError: {
							type: "object",
							title: "Cis2CallError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidToken"] },
						InvalidToken: {
							type: "object",
							title: "InvalidToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["SellPositionExists"] },
						SellPositionExists: {
							type: "object",
							title: "SellPositionExists",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["SellPositionMissing"] },
						SellPositionMissing: {
							type: "object",
							title: "SellPositionMissing",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidConversion"] },
						InvalidConversion: {
							type: "object",
							title: "InvalidConversion",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: {
							type: "object",
							title: "InvalidAmount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
			],
		},
	},
};
export type initErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "Cis2CallError"; Cis2CallError: never }
	| { tag: "InvalidToken"; InvalidToken: never }
	| { tag: "SellPositionExists"; SellPositionExists: never }
	| { tag: "SellPositionMissing"; SellPositionMissing: never }
	| { tag: "InvalidConversion"; InvalidConversion: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "LogError"; LogError: never };
export const cancelSellErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Cancel Sell Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"Unauthorized",
				"Cis2CallError",
				"InvalidToken",
				"SellPositionExists",
				"SellPositionMissing",
				"InvalidConversion",
				"InvalidAmount",
				"LogError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CallError"] },
						Cis2CallError: {
							type: "object",
							title: "Cis2CallError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidToken"] },
						InvalidToken: {
							type: "object",
							title: "InvalidToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["SellPositionExists"] },
						SellPositionExists: {
							type: "object",
							title: "SellPositionExists",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["SellPositionMissing"] },
						SellPositionMissing: {
							type: "object",
							title: "SellPositionMissing",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidConversion"] },
						InvalidConversion: {
							type: "object",
							title: "InvalidConversion",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: {
							type: "object",
							title: "InvalidAmount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
			],
		},
	},
};
export type CancelSellErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "Cis2CallError"; Cis2CallError: never }
	| { tag: "InvalidToken"; InvalidToken: never }
	| { tag: "SellPositionExists"; SellPositionExists: never }
	| { tag: "SellPositionMissing"; SellPositionMissing: never }
	| { tag: "InvalidConversion"; InvalidConversion: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "LogError"; LogError: never };
export const exchangeRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Exchange Request",
	properties: {
		token_id: {
			type: "string",
			title: "Token Id",
			default: "",
			format: "byte",
		},
		amount: { type: "string", title: "Amount" },
		from: {
			type: "object",
			title: "From",
			properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] },
								Account: {
									type: "array",
									items: { type: "string", title: "" },
								},
							},
						},
						{
							properties: {
								tag: { enum: ["Contract"] },
								Contract: {
									type: "array",
									items: {
										type: "object",
										title: "",
										properties: {
											index: { type: "integer", minimum: 0 },
											subindex: { type: "integer", minimum: 0 },
										},
									},
								},
							},
						},
					],
				},
			},
		},
		data: {
			type: "object",
			title: "Data",
			properties: {
				from: { type: "string", title: "From" },
				rate: {
					type: "object",
					title: "Rate",
					properties: {
						numerator: { type: "integer", minimum: 0, title: "Numerator" },
						denominator: { type: "integer", minimum: 0, title: "Denominator" },
					},
				},
			},
		},
	},
};
export type ExchangeRequestUi = {
	token_id: string;
	amount: string;
	from:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	data: { from: string; rate: { numerator: number; denominator: number } };
};
export const exchangeErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Exchange Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"Unauthorized",
				"Cis2CallError",
				"InvalidToken",
				"SellPositionExists",
				"SellPositionMissing",
				"InvalidConversion",
				"InvalidAmount",
				"LogError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CallError"] },
						Cis2CallError: {
							type: "object",
							title: "Cis2CallError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidToken"] },
						InvalidToken: {
							type: "object",
							title: "InvalidToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["SellPositionExists"] },
						SellPositionExists: {
							type: "object",
							title: "SellPositionExists",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["SellPositionMissing"] },
						SellPositionMissing: {
							type: "object",
							title: "SellPositionMissing",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidConversion"] },
						InvalidConversion: {
							type: "object",
							title: "InvalidConversion",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: {
							type: "object",
							title: "InvalidAmount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
			],
		},
	},
};
export type ExchangeErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "Cis2CallError"; Cis2CallError: never }
	| { tag: "InvalidToken"; InvalidToken: never }
	| { tag: "SellPositionExists"; SellPositionExists: never }
	| { tag: "SellPositionMissing"; SellPositionMissing: never }
	| { tag: "InvalidConversion"; InvalidConversion: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "LogError"; LogError: never };
export const forceCancelSellRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Force Cancel Sell Request",
	properties: {
		from: { type: "string", title: "From" },
		to: { type: "string", title: "To" },
	},
};
export type ForceCancelSellRequestUi = { from: string; to: string };
export const forceCancelSellErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Force Cancel Sell Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"Unauthorized",
				"Cis2CallError",
				"InvalidToken",
				"SellPositionExists",
				"SellPositionMissing",
				"InvalidConversion",
				"InvalidAmount",
				"LogError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CallError"] },
						Cis2CallError: {
							type: "object",
							title: "Cis2CallError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidToken"] },
						InvalidToken: {
							type: "object",
							title: "InvalidToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["SellPositionExists"] },
						SellPositionExists: {
							type: "object",
							title: "SellPositionExists",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["SellPositionMissing"] },
						SellPositionMissing: {
							type: "object",
							title: "SellPositionMissing",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidConversion"] },
						InvalidConversion: {
							type: "object",
							title: "InvalidConversion",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: {
							type: "object",
							title: "InvalidAmount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
			],
		},
	},
};
export type ForceCancelSellErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "Cis2CallError"; Cis2CallError: never }
	| { tag: "InvalidToken"; InvalidToken: never }
	| { tag: "SellPositionExists"; SellPositionExists: never }
	| { tag: "SellPositionMissing"; SellPositionMissing: never }
	| { tag: "InvalidConversion"; InvalidConversion: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "LogError"; LogError: never };
export const getDepositRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Get Deposit Request",
	properties: { from: { type: "string", title: "From" } },
};
export type GetDepositRequestUi = { from: string };
export const getDepositResponseJsonSchema: RJSFSchema = {
	type: "object",
	title: "Get Deposit Response",
	properties: {
		amount: { type: "string", title: "Amount" },
		rate: {
			type: "object",
			title: "Rate",
			properties: {
				numerator: { type: "integer", minimum: 0, title: "Numerator" },
				denominator: { type: "integer", minimum: 0, title: "Denominator" },
			},
		},
	},
};
export type GetDepositResponseUi = {
	amount: string;
	rate: { numerator: number; denominator: number };
};
export const sellRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Sell Request",
	properties: {
		token_id: {
			type: "string",
			title: "Token Id",
			default: "",
			format: "byte",
		},
		amount: { type: "string", title: "Amount" },
		from: {
			type: "object",
			title: "From",
			properties: { tag: { type: "string", enum: ["Account", "Contract"] } },
			required: ["tag"],
			dependencies: {
				tag: {
					oneOf: [
						{
							properties: {
								tag: { enum: ["Account"] },
								Account: {
									type: "array",
									items: { type: "string", title: "" },
								},
							},
						},
						{
							properties: {
								tag: { enum: ["Contract"] },
								Contract: {
									type: "array",
									items: {
										type: "object",
										title: "",
										properties: {
											index: { type: "integer", minimum: 0 },
											subindex: { type: "integer", minimum: 0 },
										},
									},
								},
							},
						},
					],
				},
			},
		},
		data: {
			type: "object",
			title: "Data",
			properties: {
				numerator: { type: "integer", minimum: 0, title: "Numerator" },
				denominator: { type: "integer", minimum: 0, title: "Denominator" },
			},
		},
	},
};
export type SellRequestUi = {
	token_id: string;
	amount: string;
	from:
		| { tag: "Account"; Account: [string] }
		| { tag: "Contract"; Contract: [{ index: number; subindex: number }] };
	data: { numerator: number; denominator: number };
};
export const sellErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Sell Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"Unauthorized",
				"Cis2CallError",
				"InvalidToken",
				"SellPositionExists",
				"SellPositionMissing",
				"InvalidConversion",
				"InvalidAmount",
				"LogError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CallError"] },
						Cis2CallError: {
							type: "object",
							title: "Cis2CallError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidToken"] },
						InvalidToken: {
							type: "object",
							title: "InvalidToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["SellPositionExists"] },
						SellPositionExists: {
							type: "object",
							title: "SellPositionExists",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["SellPositionMissing"] },
						SellPositionMissing: {
							type: "object",
							title: "SellPositionMissing",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidConversion"] },
						InvalidConversion: {
							type: "object",
							title: "InvalidConversion",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: {
							type: "object",
							title: "InvalidAmount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
			],
		},
	},
};
export type SellErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "Cis2CallError"; Cis2CallError: never }
	| { tag: "InvalidToken"; InvalidToken: never }
	| { tag: "SellPositionExists"; SellPositionExists: never }
	| { tag: "SellPositionMissing"; SellPositionMissing: never }
	| { tag: "InvalidConversion"; InvalidConversion: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "LogError"; LogError: never };
export const transferExchangeRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Transfer Exchange Request",
	properties: {
		pay: { type: "string", title: "Pay" },
		get: {
			type: "object",
			title: "Get",
			properties: {
				from: { type: "string", title: "From" },
				rate: {
					type: "object",
					title: "Rate",
					properties: {
						numerator: { type: "integer", minimum: 0, title: "Numerator" },
						denominator: { type: "integer", minimum: 0, title: "Denominator" },
					},
				},
			},
		},
	},
};
export type TransferExchangeRequestUi = {
	pay: string;
	get: { from: string; rate: { numerator: number; denominator: number } };
};
export const transferExchangeErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Transfer Exchange Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"Unauthorized",
				"Cis2CallError",
				"InvalidToken",
				"SellPositionExists",
				"SellPositionMissing",
				"InvalidConversion",
				"InvalidAmount",
				"LogError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CallError"] },
						Cis2CallError: {
							type: "object",
							title: "Cis2CallError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidToken"] },
						InvalidToken: {
							type: "object",
							title: "InvalidToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["SellPositionExists"] },
						SellPositionExists: {
							type: "object",
							title: "SellPositionExists",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["SellPositionMissing"] },
						SellPositionMissing: {
							type: "object",
							title: "SellPositionMissing",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidConversion"] },
						InvalidConversion: {
							type: "object",
							title: "InvalidConversion",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: {
							type: "object",
							title: "InvalidAmount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
			],
		},
	},
};
export type TransferExchangeErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "Cis2CallError"; Cis2CallError: never }
	| { tag: "InvalidToken"; InvalidToken: never }
	| { tag: "SellPositionExists"; SellPositionExists: never }
	| { tag: "SellPositionMissing"; SellPositionMissing: never }
	| { tag: "InvalidConversion"; InvalidConversion: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "LogError"; LogError: never };
export const transferSellRequestJsonSchema: RJSFSchema = {
	type: "object",
	title: "Transfer Sell Request",
	properties: {
		amount: { type: "string", title: "Amount" },
		rate: {
			type: "object",
			title: "Rate",
			properties: {
				numerator: { type: "integer", minimum: 0, title: "Numerator" },
				denominator: { type: "integer", minimum: 0, title: "Denominator" },
			},
		},
	},
};
export type TransferSellRequestUi = {
	amount: string;
	rate: { numerator: number; denominator: number };
};
export const transferSellErrorJsonSchema: RJSFSchema = {
	type: "object",
	title: "Transfer Sell Error",
	properties: {
		tag: {
			type: "string",
			enum: [
				"ParseError",
				"Unauthorized",
				"Cis2CallError",
				"InvalidToken",
				"SellPositionExists",
				"SellPositionMissing",
				"InvalidConversion",
				"InvalidAmount",
				"LogError",
			],
		},
	},
	required: ["tag"],
	dependencies: {
		tag: {
			oneOf: [
				{
					properties: {
						tag: { enum: ["ParseError"] },
						ParseError: { type: "object", title: "ParseError", properties: {} },
					},
				},
				{
					properties: {
						tag: { enum: ["Unauthorized"] },
						Unauthorized: {
							type: "object",
							title: "Unauthorized",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["Cis2CallError"] },
						Cis2CallError: {
							type: "object",
							title: "Cis2CallError",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidToken"] },
						InvalidToken: {
							type: "object",
							title: "InvalidToken",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["SellPositionExists"] },
						SellPositionExists: {
							type: "object",
							title: "SellPositionExists",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["SellPositionMissing"] },
						SellPositionMissing: {
							type: "object",
							title: "SellPositionMissing",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidConversion"] },
						InvalidConversion: {
							type: "object",
							title: "InvalidConversion",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["InvalidAmount"] },
						InvalidAmount: {
							type: "object",
							title: "InvalidAmount",
							properties: {},
						},
					},
				},
				{
					properties: {
						tag: { enum: ["LogError"] },
						LogError: { type: "object", title: "LogError", properties: {} },
					},
				},
			],
		},
	},
};
export type TransferSellErrorUi =
	| { tag: "ParseError"; ParseError: never }
	| { tag: "Unauthorized"; Unauthorized: never }
	| { tag: "Cis2CallError"; Cis2CallError: never }
	| { tag: "InvalidToken"; InvalidToken: never }
	| { tag: "SellPositionExists"; SellPositionExists: never }
	| { tag: "SellPositionMissing"; SellPositionMissing: never }
	| { tag: "InvalidConversion"; InvalidConversion: never }
	| { tag: "InvalidAmount"; InvalidAmount: never }
	| { tag: "LogError"; LogError: never };
export const init = (props: {
	onInitialize: (contract: ContractAddress.Type) => void;
	uiSchema?: UiSchema;
	uiWidgets?: RegistryWidgetsType;
}) =>
	GenericInit<types.initRequest, initRequestUi>({
		onContractInitialized: props.onInitialize,
		uiSchema: props.uiSchema,
		uiWidgets: props.uiWidgets,
		method: client.init,
		requestJsonSchema: initRequestJsonSchema,
		requestSchemaBase64: types.initRequestSchemaBase64,
	});
export const ENTRYPOINTS_UI: {
	[key: keyof typeof types.ENTRYPOINTS]: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) => React.JSX.Element;
} = {
	cancelSell: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericUpdate<never, never, types.CancelSellError, CancelSellErrorUi>({
			...props,
			method: client.cancelSell,
			errorJsonSchema: cancelSellErrorJsonSchema,
			errorSchemaBase64: types.cancelSellErrorSchemaBase64,
		}),
	exchange: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericUpdate<
			types.ExchangeRequest,
			ExchangeRequestUi,
			types.ExchangeError,
			ExchangeErrorUi
		>({
			...props,
			method: client.exchange,
			requestJsonSchema: exchangeRequestJsonSchema,
			requestSchemaBase64: types.exchangeRequestSchemaBase64,
			errorJsonSchema: exchangeErrorJsonSchema,
			errorSchemaBase64: types.exchangeErrorSchemaBase64,
		}),
	forceCancelSell: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericUpdate<
			types.ForceCancelSellRequest,
			ForceCancelSellRequestUi,
			types.ForceCancelSellError,
			ForceCancelSellErrorUi
		>({
			...props,
			method: client.forceCancelSell,
			requestJsonSchema: forceCancelSellRequestJsonSchema,
			requestSchemaBase64: types.forceCancelSellRequestSchemaBase64,
			errorJsonSchema: forceCancelSellErrorJsonSchema,
			errorSchemaBase64: types.forceCancelSellErrorSchemaBase64,
		}),
	getDeposit: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericInvoke<
			types.GetDepositRequest,
			GetDepositRequestUi,
			types.GetDepositResponse,
			GetDepositResponseUi,
			never,
			never
		>({
			...props,
			method: client.getDeposit,
			requestJsonSchema: getDepositRequestJsonSchema,
			requestSchemaBase64: types.getDepositRequestSchemaBase64,
			responseJsonSchema: getDepositResponseJsonSchema,
			responseSchemaBase64: types.getDepositResponseSchemaBase64,
		}),
	sell: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericUpdate<
			types.SellRequest,
			SellRequestUi,
			types.SellError,
			SellErrorUi
		>({
			...props,
			method: client.sell,
			requestJsonSchema: sellRequestJsonSchema,
			requestSchemaBase64: types.sellRequestSchemaBase64,
			errorJsonSchema: sellErrorJsonSchema,
			errorSchemaBase64: types.sellErrorSchemaBase64,
		}),
	transferExchange: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericUpdate<
			types.TransferExchangeRequest,
			TransferExchangeRequestUi,
			types.TransferExchangeError,
			TransferExchangeErrorUi
		>({
			...props,
			method: client.transferExchange,
			requestJsonSchema: transferExchangeRequestJsonSchema,
			requestSchemaBase64: types.transferExchangeRequestSchemaBase64,
			errorJsonSchema: transferExchangeErrorJsonSchema,
			errorSchemaBase64: types.transferExchangeErrorSchemaBase64,
		}),
	transferSell: (props: {
		contract: ContractAddress.Type;
		uiSchema?: UiSchema;
		uiWidgets?: RegistryWidgetsType;
	}) =>
		GenericUpdate<
			types.TransferSellRequest,
			TransferSellRequestUi,
			types.TransferSellError,
			TransferSellErrorUi
		>({
			...props,
			method: client.transferSell,
			requestJsonSchema: transferSellRequestJsonSchema,
			requestSchemaBase64: types.transferSellRequestSchemaBase64,
			errorJsonSchema: transferSellErrorJsonSchema,
			errorSchemaBase64: types.transferSellErrorSchemaBase64,
		}),
};
