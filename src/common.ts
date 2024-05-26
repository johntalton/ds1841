import { I2CAddressedBus } from '@johntalton/and-other-delights'

import { BufferSource, LUT_BYTE_PER_ENTRY } from './defs.js'
import { REGISTER } from './defs.js'

export const BYTE_LENGTH_ONE = 1

export class Common {
	static async getIVR(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.IVR, BYTE_LENGTH_ONE)
	}

	static async setIVR(bus: I2CAddressedBus, source: BufferSource) {
		return bus.writeI2cBlock(REGISTER.IVR, source)
	}

	static async getCR0(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.CR0, BYTE_LENGTH_ONE)
	}

	static async setCR0(bus: I2CAddressedBus, source: BufferSource) {
		return bus.writeI2cBlock(REGISTER.CR0, source)
	}

	static async getCR1(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.CR1, BYTE_LENGTH_ONE)
	}

	static async setCR1(bus: I2CAddressedBus, source: BufferSource) {
		return bus.writeI2cBlock(REGISTER.CR1, source)
	}

	static async getCR2(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.CR2, BYTE_LENGTH_ONE)
	}

	static async setCR2(bus: I2CAddressedBus, source: BufferSource) {
		return bus.writeI2cBlock(REGISTER.CR2, source)
	}

	static async getTemperature(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.TEMP, BYTE_LENGTH_ONE)
	}

	static async getVoltage(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.VOLTAGE, BYTE_LENGTH_ONE)
	}

	static async getLUTIndex(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.LUTAR, BYTE_LENGTH_ONE)
	}

	static async setLUTIndex(bus: I2CAddressedBus, buffer: BufferSource) {
		return bus.writeI2cBlock(REGISTER.LUTAR, buffer)
	}

	static async getLUTValue(bus: I2CAddressedBus) {
		return bus.readI2cBlock(REGISTER.LUTVAL, BYTE_LENGTH_ONE)
	}

	static async setLUTValue(bus: I2CAddressedBus, buffer: BufferSource) {
		return bus.writeI2cBlock(REGISTER.LUTVAL, buffer)
	}


	static async getLUT(bus: I2CAddressedBus, offset: number, count: number) {
		return bus.readI2cBlock(REGISTER.LUT_START + offset, count * LUT_BYTE_PER_ENTRY)
	}

	static async setLUT(bus: I2CAddressedBus, offset: number, buffer: BufferSource) {
		return bus.writeI2cBlock(REGISTER.LUT_START + offset, buffer)
	}
}
