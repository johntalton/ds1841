import { I2CAddressedBus } from '@johntalton/and-other-delights'

import { Common } from './common.js'

export class DS1841 {
  #abus: I2CAddressedBus

  static from(abus: I2CAddressedBus) { return Promise.resolve(new DS1841(abus)) }

	constructor(abus: I2CAddressedBus) {
		this.#abus = abus
	}

  setProfile(profile) {
    return Common.setProfile(this.#abus, profile)
  }
}