import { I2CAddressedBus } from '@johntalton/and-other-delights'

import { Common } from './common.js'
import { Converter } from './converter.js'

export class DS1841 {
  #bus: I2CAddressedBus

  static from(bus: I2CAddressedBus) { return Promise.resolve(new DS1841(bus)) }

	constructor(bus: I2CAddressedBus) {
		this.#bus = bus
	}

  getProfile() { return Common.getProfile(this.#bus) }

  getCR2() { return Common.getCR2(this.#bus) }

  getTemperature() { return Common.getTemperature(this.#bus) }

  getVoltage() { return Converter.decodeVoltage(Common.getVoltage(this.#bus)) }
}