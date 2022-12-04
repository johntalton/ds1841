import { I2CAddressedBus } from '@johntalton/and-other-delights'
import { BitSmush } from '@johntalton/bitsmush'


const REGISTER = {
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

const REGISTER_LUT_MIN_TEMP = REGISTER.LUT_START
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
		return bus.readI2cBlock(REGISTER.IVR, 1)
	}

	static async setIVR(bus: I2CAddressedBus, ivr: number) {
		return bus.writeI2cBlock(REGISTER.IVR, Uint8Array.from([ ivr ]))
	}

	static async getWIPER(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.WR, 1)
	}

	static async setWIPER(bus: I2CAddressedBus, wiper: number) {
		return bus.writeI2cBlock(REGISTER.WR, Uint8Array.from([ wiper ]))
	}

	static async getControls(bus: I2CAddressedBus) {
		const cr0 = await Common.getCR0(bus)
		const cr1 = await Common.getCR1(bus)
		const cr2 = await Common.getCR2(bus)

		return {
			...cr0,
			...cr1,
			...cr2
		}
	}

	static async setControls(bus: I2CAddressedBus, controls) {

	}

	static async getCR0(bus: I2CAddressedBus) {
		const cr0Buffer = await bus.readI2cBlock(REGISTER.CR0, 1)
		if (cr0Buffer.byteLength !== 1) { throw new Error('read returned incorrect bytes length') }
		const cr0 = (new Uint8Array(cr0Buffer))[0]

		const mode = BitSmush.extractBits(cr0, 7, 1)

		return {
			mode
		}
	}

	static async setCR0(bus: I2CAddressedBus, mode) {

	}

	static async getCR1(bus: I2CAddressedBus) {
		const cr1Buffer = await bus.readI2cBlock(REGISTER.CR1, 1)
		if (cr1Buffer.byteLength !== 1) { throw new Error('read returned incorrect bytes length') }
		const cr1 = (new Uint8Array(cr1Buffer))[0]

		const updateMode = BitSmush.extractBits(cr1, 0, 1)
		const addressMode = BitSmush.extractBits(cr1, 1, 1)

		return {
			updateMode,
			addressMode
		}
	}

	static async setCR1(bus: I2CAddressedBus, updateMode, addressMode) {

	}

	static async getCR2(bus: I2CAddressedBus) {
		const cr2Buffer = await bus.readI2cBlock(REGISTER.CR1, 1)
		if (cr2Buffer.byteLength !== 1) { throw new Error('read returned incorrect bytes length') }
		const cr2 = (new Uint8Array(cr2Buffer))[0]

		const wiperAccessControl = BitSmush.extractBits(cr2, 0, 1)
		const lutIndexMode = BitSmush.extractBits(cr2, 1, 1)

		return {
			wiperAccessControl,
			lutIndexMode
		}
	}

	static async setCR2(bus: I2CAddressedBus, wiperAccessControl, lutIndexMode) {

	}

	static async getTemperature(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.TEMP, 1)
	}

	static async getVoltage(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.VOLTAGE, 1)
	}

	static async getLUTIndex(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.LUTAR, 1)
	}

	static async setLUTAIndex(bus: I2CAddressedBus, index: number) {

	}

	static async getLUT(bus: I2CAddressedBus) {
		const LUT_SIZE = 72
		return bus.readI2cBlock(REGISTER.LUT_START, LUT_SIZE)
	}

	static async getLUTByIndex(bus: I2CAddressedBus, index: number) {
		return bus.readI2cBlock(REGISTER.LUT_START + index, 1)
	}

	static async setLUTByIndex(bus: I2CAddressedBus, index: number, value: number) {

	}

	static async getProfile(bus: I2CAddressedBus) {

		const controls = await Common.getControls(bus)
		const ivr = await Common.getIVR(bus)
		const lutAddr = await Common.getLUTIndex(bus)
		const wiper = await Common.getWIPER(bus)
		const temp = await Common.getTemperature(bus)
		const volt = await Common.getVoltage(bus)
		const lut = await Common.getLUT(bus)

		return {
			// IRV or Wiper value
			value: ivr,

			// NV RAM / EEPROM update mode
			mode: controls.mode,

			// Wiper controls
			updateMode: controls.updateMode,
			addressMode: controls.addressMode,

			// LUT addressing controls
			lutIndexMode: controls.lutIndexMode,
			lutIndex: lutAddr,

			// wiper controls
			wiperAccessControl: controls.wiperAccessControl,
			wiper,

			// ADC updated sensor values
			temperatureC: temp,
			supplyVoltage: volt,

			lut
		}
	}
}