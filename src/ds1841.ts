import { I2CAddressedBus } from '@johntalton/and-other-delights'

import { Common } from './common.js'
import { Converter } from './converter.js'
import {
  Controls, ControlRegisters,
  ControlRegister0, ControlRegister1, ControlRegister2
} from './defs.js'

function _decodeControls(controls: ControlRegisters): Controls {
  const cr0 = Converter.decodeCR0(controls.cr0)
  const cr1 = Converter.decodeCR1(controls.cr1)
  const cr2 = Converter.decodeCR2(controls.cr2)

  return {
    // NV RAM / EEPROM update mode
    mode: cr0.mode,

    // Wiper controls
    updateMode: cr1.updateMode,
    additionMode: cr1.additionMode,

    // LUT addressing controls
    lutIndexMode: cr2.lutIndexMode,

    // wiper controls
    wiperAccessControl: cr2.wiperAccessControl
  }
}

export class DS1841 {
  #bus: I2CAddressedBus

  static from(bus: I2CAddressedBus) { return Promise.resolve(new DS1841(bus)) }

	constructor(bus: I2CAddressedBus) {
		this.#bus = bus
	}

  async getControls() {
    const controls = await Common.getControls(this.#bus)

    return _decodeControls(controls)
  }

  async getProfile() {
    const profile = await Common.getProfile(this.#bus)

    return {
      ..._decodeControls(profile),

    	// IRV or Wiper value
      value: Converter.decodeIRV(profile.value),
      wiper: Converter.decodeWIPER(profile.wiper),

			lutIndex: Converter.decodeLUTIndex(profile.lutAddr),

			// ADC updated sensor values
			temperatureC: Converter.decodeTemperature(profile.temp),
			mVoltage: Converter.decodeVoltage(profile.volt),

			lut: Converter.decodeLUT(profile.lut)
    }
  }

  async getIVR() { return Converter.decodeIRV(await Common.getIVR(this.#bus)) }

  async setIVR(value: number) { return Common.setIVR(this.#bus, Converter.encodeIVR(value)) }

  async getWIPER() { return Converter.decodeWIPER(await Common.getWIPER(this.#bus)) }


  async getCR0() { return Converter.decodeCR0(await Common.getCR0(this.#bus)) }

  async setCR0(value: ControlRegister0) { return Common.setCR0(this.#bus, Converter.encodeCR0(value)) }

  async getCR1() { return Converter.decodeCR1(await Common.getCR1(this.#bus)) }

  async setCR1(value: ControlRegister1) { return Common.setCR1(this.#bus, Converter.encodeCR1(value)) }

  async getCR2() { return Converter.decodeCR2(await Common.getCR2(this.#bus)) }

  async setCR2(value: ControlRegister2) { return Common.setCR2(this.#bus, Converter.encodeCR2(value)) }

  async getTemperature() { return Converter.decodeTemperature(await Common.getTemperature(this.#bus)) }

  async getVoltage() { return Converter.decodeVoltage(await Common.getVoltage(this.#bus)) }

  //

  async getLUTIndex() { return Converter.decodeLUTIndex(await Common.getLUTIndex(this.#bus)) }

  async getLUT() { return Converter.decodeLUT(await Common.getLUT(this.#bus)) }

  async getLUTByIndex(index: number) { return Converter.decodeLUTValue(await Common.getLUTByIndex(this.#bus, index)) }

  async setLUTByIndex(index: number, value: number) { return Common.setLUTByIndex(this.#bus, index, Converter.encodeLUTByIndex(value))}
}
