import { I2CAddressedBus } from '@johntalton/and-other-delights'

import { Common } from './common.js'
import { Converter } from './converter.js'

export class DS1841 {
  #bus: I2CAddressedBus

  static from(bus: I2CAddressedBus) { return Promise.resolve(new DS1841(bus)) }

	constructor(bus: I2CAddressedBus) {
		this.#bus = bus
	}

  async getProfile() { return Common.getProfile(this.#bus) }

  async getCR0() { return Converter.decodeCR0(await Common.getCR0(this.#bus)) }

  async getCR1() { return Converter.decodeCR1(await Common.getCR1(this.#bus)) }

  async getCR2() { return Converter.decodeCR2(await Common.getCR2(this.#bus)) }

  async getTemperature() { return Converter.decodeTemperature(await Common.getTemperature(this.#bus)) }

  async getVoltage() { return Converter.decodeVoltage(await Common.getVoltage(this.#bus)) }
}
