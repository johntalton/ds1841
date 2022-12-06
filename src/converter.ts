import { BitSmush } from '@johntalton/bitsmush'
import { ConverterBufferSource } from './defs.js'

import {
	REGISTER, VOLTAGE_LSB_MA,
	ControlRegister0, ControlRegister1, ControlRegister2
} from './defs.js'

const ONE_BIT_MASK = 0b1

export class Converter {
	static decodeIRV(source: ConverterBufferSource) {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }
		return buffer.getUint8(0)
	}

	static decodeWIPER(source: ConverterBufferSource) {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }
		return buffer.getUint8(0)
	}

	static decodeCR0(source: ConverterBufferSource): ControlRegister0 {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }
		const cr0 = buffer.getUint8(0)

		const mode = BitSmush.extractBits(cr0, 7, 1)

		return {
			mode
		}
	}

	static decodeCR1(source: ConverterBufferSource): ControlRegister1 {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }
		const cr1 = buffer.getUint8(0)

		const updateMode = BitSmush.extractBits(cr1, 0, 1)
		const additionMode = BitSmush.extractBits(cr1, 1, 1)

		return {
			updateMode,
			additionMode
		}
	}

	static decodeCR2(source: ConverterBufferSource): ControlRegister2 {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }
		const cr2 = buffer.getUint8(0)

		const wiperAccessControl = BitSmush.extractBits(cr2, 2, 1)
		const lutIndexMode = BitSmush.extractBits(cr2, 1, 1)

		return {
			wiperAccessControl,
			lutIndexMode
		}
	}

	static decodeTemperature(source: ConverterBufferSource): number {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }
		const result = buffer.getUint8(0)

		// result is greater than or equal to 128, subtract 256 from the result
		return result >= 128 ? result - 256 : result
	}

	static decodeVoltage(source: ConverterBufferSource): number {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }

		return buffer.getUint8(0) * VOLTAGE_LSB_MA
	}

	//

	static decodeLUTIndex(source: ConverterBufferSource): number {
		const lutAddress = Converter.decodeLUTAddress(source)

		return lutAddress - REGISTER.LUT_START
	}

	static decodeLUTAddress(source: ConverterBufferSource): number {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }
		return buffer.getUint8(0)
	}

	static decodeLUT(source: ConverterBufferSource): { [key: number]: number } {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		const uint = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)

		return uint.reduce((acc: { [key: number]: number }, value, index) => {
			acc[index] = value
			return acc
		}, { })
	}

	static decodeLUTValue(source: ConverterBufferSource): number {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }

		return buffer.getUint8(0)
	}



	//


	static encodeCR0(value: ControlRegister0) {
		const { mode } = value

		const cr0 = (mode & ONE_BIT_MASK) << 7
		const buffer = Uint8Array.from([ cr0 ])
		return buffer.buffer
	}

	static encodeCR1(value: ControlRegister1) {
		const { updateMode, additionMode } = value
		const cr1 = (updateMode & ONE_BIT_MASK) | ((additionMode & ONE_BIT_MASK) << 1)

		const buffer = Uint8Array.from([ cr1 ])
		return buffer.buffer
	}

	static encodeCR2(value: ControlRegister2) {
		const { wiperAccessControl, lutIndexMode } = value

		const cr2 = ((wiperAccessControl & ONE_BIT_MASK) << 2) | ((lutIndexMode & ONE_BIT_MASK) << 1)

		const buffer = Uint8Array.from([ cr2 ])
		return buffer.buffer
	}
}
