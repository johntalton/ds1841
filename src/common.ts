import { I2CAddressedBus } from '@johntalton/and-other-delights'

import { REGISTER, LUT_SIZE } from './defs.js'

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
		const [ cr0, cr1, cr2 ] = await Promise.all([
			Common.getCR0(bus),
			Common.getCR1(bus),
			Common.getCR2(bus)
		])

		return {
			cr0,
			cr1,
			cr2
		}
	}

	// static async setControls(bus: I2CAddressedBus, controls) {

	// }

	static async getCR0(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.CR0, 1)
	}

	// static async setCR0(bus: I2CAddressedBus, mode) {

	// }

	static async getCR1(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.CR1, 1)
	}

	// static async setCR1(bus: I2CAddressedBus, updateMode, addressMode) {

	// }

	static async getCR2(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.CR1, 1)
	}

	// static async setCR2(bus: I2CAddressedBus, wiperAccessControl, lutIndexMode) {

	// }

	static async getTemperature(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.TEMP, 1)
	}

	static async getVoltage(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.VOLTAGE, 1)
	}

	static async getLUTIndex(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.LUTAR, 1)
	}

	// static async setLUTAIndex(bus: I2CAddressedBus, index: number) {

	// }

	static async getLUT(bus: I2CAddressedBus) {
		const first = await bus.readI2cBlock(REGISTER.LUT_START, 32)
		// const second = await bus.readI2cBlock(REGISTER.LUT_START + 32, 32)

		return first

		return bus.readI2cBlock(REGISTER.LUT_START, LUT_SIZE)
	}

	static async getLUTByIndex(bus: I2CAddressedBus, index: number) {
		return bus.readI2cBlock(REGISTER.LUT_START + index, 1)
	}

	// static async setLUTByIndex(bus: I2CAddressedBus, index: number, value: number) {

	// }

	static async getProfile(bus: I2CAddressedBus) {

		const controls = await Common.getControls(bus)

		const [ ivr, lutAddr, wiper, temp, volt, lut ] = await Promise.all([
			Common.getIVR(bus),
			Common.getLUTIndex(bus),
			Common.getWIPER(bus),
			Common.getTemperature(bus),
			Common.getVoltage(bus),
			Common.getLUT(bus)
		])

		return {
			...controls,
			value: ivr,
			lutAddr,
			wiper,
			temp,
			volt,
			lut
		}
	}
}