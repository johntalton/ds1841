import { BitSmush } from '@johntalton/bitsmush'
import { ConverterBufferSource } from './defs.js'



export class Converter {
	static decodeIRV(source: ConverterBufferSource) {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }
		const irv = buffer.getUint8(0)

		return {
			value: irv
		}
	}

	static decodeWIPER(source: ConverterBufferSource) {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }
		const wr = buffer.getUint8(0)

		return {
			wiper: wr
		}
	}

	static decodeCR0(source: ConverterBufferSource) {
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

	static decodeCR1(source: ConverterBufferSource) {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }
		const cr1 = buffer.getUint8(0)

		const updateMode = BitSmush.extractBits(cr1, 0, 1)
		const addressMode = BitSmush.extractBits(cr1, 1, 1)

		return {
			updateMode,
			addressMode
		}
	}

	static decodeCR2(source: ConverterBufferSource) {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }
		const cr2 = buffer.getUint8(0)

		const wiperAccessControl = BitSmush.extractBits(cr2, 0, 1)
		const lutIndexMode = BitSmush.extractBits(cr2, 1, 1)

		return {
			wiperAccessControl,
			lutIndexMode
		}
	}

	static decodeTemperature(source: ConverterBufferSource) {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }
		const result = buffer.getUint8(0)

		// result is greater than or equal to 128, subtract 256 from the result
		const c = result >= 128 ? result - 256 : result

		return {
			temperatureC: c
		}
	}

	static decodeVoltage(source: ConverterBufferSource) {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }
		const mV = buffer.getUint8(0)

		return {
			mV
		}
	}

	//

	static decodeLUTIndex(source: ConverterBufferSource) {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }
		const lutIndex = buffer.getUint8(0)

		return {
			lutIndex
		}
	}

	static decodeLUT(source: ConverterBufferSource) {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		const uint = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)

		return uint.reduce((acc: { [key: number]: number }, value, index) => {
			acc[index] = value
			return acc
		}, { })
	}

	static decodeLUTValue(source: ConverterBufferSource) {
		const buffer = ArrayBuffer.isView(source) ?
			new DataView(source.buffer, source.byteOffset, source.byteLength) :
			new DataView(source, 0, source.byteLength)

		if (buffer.byteLength !== 1) { throw new Error('invalid length') }

		return buffer.getUint8(0)
	}
}
