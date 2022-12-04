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

export const MODE_SET_AND_UPDATE = 0 //default
export const MODE_UPDATE_ONLY = 1

// addressMode
export const SUMMED = 1 // default
export const DIRECT = 0

// lut mode
export const FROM_ADC_TEMPERATURE = 0 // default
export const FROM_DIRECT_VALUE = 1

// update mode
export const ADC_ON = 1 // default
export const ADC_OFF = 0

export const ADC_CONTROL = 0 // default
export const MANUAL = 1






export type ConverterBufferSource = ArrayBuffer | SharedArrayBuffer | DataView

export type ControlRegisters = {
  cr0: ConverterBufferSource,
  cr1: ConverterBufferSource,
  cr2: ConverterBufferSource
}

export type Controls = {
  mode: number,

  updateMode: number,
  addressMode: number,

  lutIndexMode: number,

  wiperAccessControl: number
}