import { I2CAddressedBus } from '@johntalton/and-other-delights'
import { BitSmush } from '@johntalton/bitsmush'


const REGISTERS = {
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

const REGISTER_LUT_MIN_TEMP = REGISTERS.LUT_START
const REGISTER_LUT_MAX_TEMP = 0xC7


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

export class Common {


	static async getIVR(bus: I2CAddressedBus) {

	}

	static async setIVR(bus: I2CAddressedBus, ivr: number) {

	}

	static async getWIPER(bus: I2CAddressedBus) {

	}

	static async setWIPER(bus: I2CAddressedBus, wiper: number) {

	}

	static async getControls(bus: I2CAddressedBus) {

	}

	static async setControls(bus: I2CAddressedBus, controls) {

	}

	static async setMode(bus: I2CAddressedBus, mode) {
		return Common.setCR0(bus, mode)
	}

	static async setCR0(bus: I2CAddressedBus, mode) {

	}

	static async setCR1(bus: I2CAddressedBus, updateMode, addressMode) {

	}

	static async setCR2(bus: I2CAddressedBus, wiperAccessControl, lutIndexMode) {

	}

	static async getTemperature(bus: I2CAddressedBus) {

	}

	static async getVoltage(bus: I2CAddressedBus) {

	}

	static async getLUTIndex(bus: I2CAddressedBus) {

	}

	static async setLUTAIndex(bus: I2CAddressedBus, index: number) {

	}

	static async getLUT(bus: I2CAddressedBus) {

	}

	static async getLUTByIndex(bus: I2CAddressedBus, index: number) {

	}


	static async setLUTByIndex(bus: I2CAddressedBus, index: number, value: number) {

	}






	static async getProfile(bus: I2CAddressedBus) {
		const cr0Buffer = await bus.readI2cBlock(REGISTERS.CR0, 1)
		if (cr0Buffer.byteLength !== 1) { throw new Error('read returned incorrect bytes length') }
		const cr0 = (new Uint8Array(cr0Buffer))[0]

		const mode = BitSmush.extractBits(cr0, 7, 1)

		const cr1Buffer = await bus.readI2cBlock(REGISTERS.CR1, 1)
		if (cr1Buffer.byteLength !== 1) { throw new Error('read returned incorrect bytes length') }
		const cr1 = (new Uint8Array(cr1Buffer))[0]

		const updateMode = BitSmush.extractBits(cr1, 0, 1)
		const addressMode = BitSmush.extractBits(cr1, 1, 1)


		//



		return {
			// IRV or Wiper value
			value: 0,

			// NV RAM / EEPROM update mode
			mode,

			// Wiper controls
			updateMode, // ADC_ON
			addressMode, // SUMMED

			// LUT addressing controls
			lutIndexMode: FROM_ADC_TEMPERATURE,
			lutIndex: 0,

			// wiper controls
			wiperAccessControl: ADC_CONTROL,
			wiper: 0,

			// ADC updated sensor values
			temperatureC: 0,
			supplyVoltage: 0,

			lut: [
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0
			]
		}
	}
}