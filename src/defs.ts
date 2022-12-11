export const REGISTER = {
	IVR: 0x00,
	CR0: 0x02,
	CR1: 0x03,
	LUTAR: 0x08,
	WR: 0x09,
	CR2: 0x0A,
	TEMP: 0x0C,
	VOLTAGE: 0x0E,
	LUT_START: 0x80
}

export const LUT_SIZE = 72

export const MODE = {
	SET_AND_UPDATE: 0, //default
	UPDATE_ONLY: 1
}

// addressMode
export const ADDITION_MODE = {
	SUMMED: 1, // default
	DIRECT: 0
}

// lut mode
export const LUT_MODE = {
	FROM_ADC_TEMPERATURE: 0, // default
	FROM_DIRECT_VALUE: 1
}

// update mode
export const ADC = {
	ON: 1, // default
	OFF: 0
}

export const ACCESS_CONTROL = {
	ADC_CONTROL: 0, // default
	MANUAL: 1
}


export const VOLTAGE_LSB_MA = 25.6



export type ConverterBufferSource = ArrayBuffer | SharedArrayBuffer | DataView

export type ControlRegisters = {
  cr0: ConverterBufferSource,
  cr1: ConverterBufferSource,
  cr2: ConverterBufferSource
}


export type ControlRegister0 = {
	mode: number
}

export type ControlRegister1 = {
	updateMode: number,
	additionMode: number
}

export type ControlRegister2 = {
	wiperAccessControl: number,
	lutIndexMode: number
}

export type Controls = ControlRegister0 & ControlRegister1 & ControlRegister2