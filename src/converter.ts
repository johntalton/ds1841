import { BitSmush } from '@johntalton/bitsmush'

import {
	BufferSource,
	Control0,
	Control1,
	Control2,
	LUT_ADDRESS_INDEX_OFFSET
} from './defs.js'
import {
  VOLTAGE_LSB_MA
} from './defs.js'

export const BIT_SET = 1
export const BIT_UNSET = 0

export const OFFSET = {
	CR0: {
		SEE: 7
	},
	CR1: {
		UPDATE: 0,
		ADD: 1
	},
	CR2: {
		ACCESS: 2,
		MODE: 1
	}
}

export const BIT_LENGTH_ONE = 1


export class Converter {
	static decodeByte(source: BufferSource) {
		const u8 = ArrayBuffer.isView(source) ?
			new Uint8Array(source.buffer, source.byteOffset, source.byteLength) :
			new Uint8Array(source)
		// console.log('decodeByte', u8[0])
		return u8[0]
	}

	static decodeUnsigned(source: BufferSource) {
		const result = Converter.decodeByte(source)

		// result is greater than or equal to 128, subtract 256 from the result
		return (result >= 128) ? result - 256 : result
	}

	static decodeCR0(source: BufferSource): Control0 {
		const cr0 = Converter.decodeByte(source)
		const see = BitSmush.extractBits(cr0, OFFSET.CR0.SEE, BIT_LENGTH_ONE)

		return {
			enableShadowEE: see === BIT_SET
		}
	}

	static decodeCR1(source: BufferSource): Control1 {
		const cr1 = Converter.decodeByte(source)
		const updateMode = BitSmush.extractBits(cr1, OFFSET.CR1.UPDATE, BIT_LENGTH_ONE)
		const additionMode = BitSmush.extractBits(cr1, OFFSET.CR1.ADD, BIT_LENGTH_ONE)

		return {
			enableADC: updateMode === BIT_SET,
			enableSummation: additionMode === BIT_SET
		}
	}

	static decodeCR2(source: BufferSource): Control2 {
		const cr2 = Converter.decodeByte(source)

		const wiperAccessControl = BitSmush.extractBits(cr2, OFFSET.CR2.ACCESS, BIT_LENGTH_ONE)
		const modeLUTAR = BitSmush.extractBits(cr2, OFFSET.CR2.MODE, BIT_LENGTH_ONE)

		return {
			enableLUTAddressUpdate: modeLUTAR !== BIT_SET,
			enableLUTValueUpdate: wiperAccessControl !== BIT_SET
		}
	}

	static decodeTemperature(source: BufferSource): number {
		return Converter.decodeUnsigned(source)
	}

	static decodeVoltage(source: BufferSource): number {
		return Converter.decodeByte(source) * VOLTAGE_LSB_MA
	}

	static decodeIRV(source: BufferSource) {
		return Converter.decodeByte(source)
	}

	static decodeLUTValue(source: BufferSource): number {
		return Converter.decodeByte(source)
	}

	static decodeLUTIndex(source: BufferSource): number {
		return Converter.decodeByte(source) - LUT_ADDRESS_INDEX_OFFSET
	}

	static decodeLUT(source: BufferSource): Array<number> {
		const u8 = ArrayBuffer.isView(source) ?
			new Uint8Array(source.buffer, source.byteOffset, source.byteLength) :
			new Uint8Array(source)

		return [ ...u8 ].map(u => Converter.decodeUnsigned(Uint8Array.from([ u ])))
	}

	//
	// ---------------------------------------------------------------------------
	//
	static encodeByte(value: number): ArrayBuffer {
		// console.log('encodeByte', value)
		return Uint8Array.from([ value ]).buffer
	}

	static encodeCR0({
		enableShadowEE = false
	}: Control0) {
		const see = enableShadowEE ? BIT_SET : BIT_UNSET
		const cr0 = (see << OFFSET.CR0.SEE)
		return Converter.encodeByte(cr0)
	}

	static encodeCR1({
		enableADC = true,
		enableSummation = true
	}: Control1) {
		const addrMode = enableSummation ? BIT_SET : BIT_UNSET
		const updateMode = enableADC ? BIT_SET : BIT_UNSET
		const cr1 = (addrMode << OFFSET.CR1.ADD) | (updateMode << OFFSET.CR1.UPDATE)

		return Converter.encodeByte(cr1)
	}

	static encodeCR2({
		enableLUTValueUpdate = true,
		enableLUTAddressUpdate = true
	}: Control2) {
		const wiperAccessControl = !enableLUTValueUpdate ? BIT_SET : BIT_UNSET
		const modeLUTAR = !enableLUTAddressUpdate ? BIT_SET : BIT_UNSET
		const cr2 = (wiperAccessControl << OFFSET.CR2.ACCESS) | (modeLUTAR << OFFSET.CR2.MODE)

		return Converter.encodeByte(cr2)
	}

	static encodeIVR(value: number) {
		return Converter.encodeByte(value)
	}

	static encodeLUTValue(value: number) {
		return Converter.encodeByte(value)
	}

	static encodeLUTIndex(value: number) {
		return Converter.encodeByte(LUT_ADDRESS_INDEX_OFFSET + value)
	}

	static encodeLUT(...values: Array<number>) {
		return Uint8Array.from(values)
	}
}
