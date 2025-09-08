export type BufferSource = ArrayBufferLike | ArrayBufferView

export type Control0 = {
	enableShadowEE: boolean
}

export type Control1 = {
	enableADC: boolean,
	enableSummation: boolean
}

export type Control2 = {
	enableLUTValueUpdate: boolean,
	enableLUTAddressUpdate: boolean
}

export type Controls = Control0 & Control1 & Control2

// ---

export const DEFAULT_ADDRESS = 0x28

export const REGISTER = {
	IVR: 0x00,
	CR0: 0x02,
	CR1: 0x03,
	LUTAR: 0x08,
	LUTVAL: 0x09, // WR
	CR2: 0x0A,
	TEMP: 0x0C,
	VOLTAGE: 0x0E,

	LUT_START: 0x80
}

export const LUT_TABLE_SIZE = 72
export const LUT_BYTE_PER_ENTRY = 1
export const LUT_BYTE_SIZE = LUT_TABLE_SIZE * LUT_BYTE_PER_ENTRY

export const LUT_ADDRESS_INDEX_OFFSET = REGISTER.LUT_START

export const VOLTAGE_LSB_MA = 25.6

