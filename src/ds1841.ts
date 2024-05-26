import { I2CAddressedBus } from '@johntalton/and-other-delights'

import { Common } from './common.js'
import { Converter } from './converter.js'
import { Control0, Control1, Control2 } from './defs.js'

export class DS1841 {
	#bus: I2CAddressedBus
	static from(bus: I2CAddressedBus) { return new DS1841(bus) }
	constructor(bus: I2CAddressedBus) { this.#bus = bus }

	//
	async getIVR() { return Converter.decodeIRV(await Common.getIVR(this.#bus)) }
	async setIVR(value: number) { return Common.setIVR(this.#bus, Converter.encodeIVR(value)) }

	//
	async getCR0() { return Converter.decodeCR0(await Common.getCR0(this.#bus)) }
	async setCR0(value: Control0) { return Common.setCR0(this.#bus, Converter.encodeCR0(value)) }

	async getCR1() { return Converter.decodeCR1(await Common.getCR1(this.#bus)) }
	async setCR1(value: Control1) { return Common.setCR1(this.#bus, Converter.encodeCR1(value)) }

	async getCR2() { return Converter.decodeCR2(await Common.getCR2(this.#bus)) }
	async setCR2(value: Control2) { return Common.setCR2(this.#bus, Converter.encodeCR2(value)) }

	//
	async getTemperature() { return Converter.decodeTemperature(await Common.getTemperature(this.#bus)) }

	async getVoltage() { return Converter.decodeVoltage(await Common.getVoltage(this.#bus)) }

	//
	async getLUTIndex() { return Converter.decodeLUTIndex(await Common.getLUTIndex(this.#bus)) }
	async setLUTIndex(value: number) { return Common.setLUTIndex(this.#bus, Converter.encodeLUTIndex(value)) }

	async getLUTValue() { return Converter.decodeLUTValue(await Common.getLUTValue(this.#bus)) }
	async setLUTValue(value: number) { return Common.setLUTValue(this.#bus, Converter.encodeLUTValue(value)) }

	//
	async getLUT(offset: number, count: number) { return Converter.decodeLUT(await Common.getLUT(this.#bus, offset, count)) }
	async setLUT(offset: number, ...values: Array<number>) { return Common.setLUT(this.#bus, offset, Converter.encodeLUT(...values)) }

}
