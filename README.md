# ds1841

Logarithmic Scale Digital Potentiometer ...
Ya, its all that

[![npm Version](http://img.shields.io/npm/v/@johntalton/ds1841.svg)](https://www.npmjs.com/package/@johntalton/ds1841)
![GitHub package.json version](https://img.shields.io/github/package-json/v/johntalton/ds1841)
[![CI](https://github.com/johntalton/ds1841/actions/workflows/CI.yaml/badge.svg)](https://github.com/johntalton/ds1841/actions/workflows/CI.yaml)



# Modes and Interactions

The device operates as a standard digital POT, it however does have some extra configuration that can enable its LUT mode.  It also stores Non-Volatile configuration for control register 1 and its IRV.

Its multiple states of updating via temperature to LUT to potential summation with the IRV give the chip a wide range of flexibility for the user.


# LUT (Lookup Table)

To compensate for temperature variations the devices has a lookup table which is indexed by the Temperature of the sensor.
This index can be updated via the table or manually.  Also the result of the index can be made to update the POTs value or set manually.

# Example

```javascript
import { I2CAddressedBus } from '@johntalton/and-other-delights'
import { DS1841 } from '@johntalton/ds1841'

const bus = /* I2CBus */
const aBus = new I2CAddressedBus(bus, 0x28)
const device = new DS1841(aBus)

await device.setIRV(42)
await device.setCR2({
  enableLUTValueUpdate: true,
  enableLUTAddressUpdate: true
})


```