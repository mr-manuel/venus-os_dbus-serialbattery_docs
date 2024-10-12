---
id: connect
title: How to connect and prepare the battery/BMS
sidebar_position: 4
# Display h2 to h4 headings
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# How to connect and prepare the battery/BMS

Since for some BMS the port labeling is a mess and not reflecting the real situation here are some useful links.

## Daly BMS

> 🌼🔗 Only if you want to connect multiple Daly BMS to the same RS485 adapter 👇

1. Use Daly's [`BMS Tools`](https://www.dalybms.com/download-pc-software/) software (only for Windows) to set the board number.
Using the mobile app `SMART BMS` to set the board number will not correctly set it.

2. Set a different board number for each BMS in the `BMS Tools` software and then specify the MODBUS addresses in the `config.ini` at the `MODBUS_ADDRESSES` parameter.

For example, if you are using three batteries the parameter would be `MODBUS_ADDRESSES = 0x40, 0x41, 0x42`.

| Board number | MODBUS address |
| :---:        | :---:          |
| `0`          | `0x40`         |
| `1`          | `0x41`         |
| `2`          | `0x42`         |
| `3`          | `0x43`         |
| `4`          | `0x44`         |
| `5`          | `0x45`         |
| `6`          | `0x46`         |
| `7`          | `0x47`         |
| `8`          | `0x48`         |
| `9`          | `0x49`         |
| `10`         | `0x4a`         |
| `11`         | `0x4b`         |
| `12`         | `0x4c`         |
| `13`         | `0x4d`         |
| `14`         | `0x4e`         |
| `15`         | `0x4f`         |

## Daren 485

See [daren-485](https://github.com/cpttinkering/daren-485) on GitHub.

## EG4 LiFePower

Set your DIP switch pins to 1 for the battery connected to the Cerbo GX.

> 🌼🔗 Only if you want to connect multiple Renogy BMS to the same RS485 adapter 👇

Set different battery addresses for each battery using the dip switches and then specify the MODBUS addresses in the `config.ini` at the `MODBUS_ADDRESSES` parameter.

For example, if you are using three batteries (battery 1 dip switches: `1: ON, rest off`, battery 2 dip switches: `1: OFF, 2: ON, rest off`, battery 3 dip switches: `1: ON, 2: ON, rest off`) the parameter would be `MODBUS_ADDRESSES = 0x01, 0x02, 0x03`.

| Dip switch position | MODBUS address |
| :---:               | :---:          |
| `1 2 3 4`           |                |
| `_ _ _ _`           | `0x00`         |
| `‾ _ _ _`           | `0x01`         |
| `_ ‾ _ _`           | `0x02`         |
| `‾ ‾ _ _`           | `0x03`         |
| `_ _ ‾ _`           | `0x04`         |
| `‾ _ ‾ _`           | `0x05`         |
| `_ ‾ ‾ _`           | `0x06`         |
| `‾ ‾ ‾ _`           | `0x07`         |
| `_ _ _ ‾`           | `0x08`         |
| `‾ _ _ ‾`           | `0x09`         |
| `_ ‾ _ ‾`           | `0x0A`         |
| `‾ ‾ _ ‾`           | `0x0B`         |
| `_ _ ‾ ‾`           | `0x0C`         |
| `‾ _ ‾ ‾`           | `0x0D`         |
| `_ ‾ ‾ ‾`           | `0x0E`         |
| `‾ ‾ ‾ ‾`           | `0x0F`         |

See also [EG Lifepower (Narada battery that uses Tianpower BMS) - Multi battery setup problems](https://github.com/Louisvdw/dbus-serialbattery/issues/1104).

## JKBMS

* https://github.com/Louisvdw/dbus-serialbattery/discussions/250

* https://github.com/Louisvdw/dbus-serialbattery/discussions/578

## JKBMS PB Model (also know as JK Inverter BMS)

* https://github.com/Louisvdw/dbus-serialbattery/discussions/969

## Renogy

> 🌼🔗 Only if you want to connect multiple Renogy BMS to the same RS485 adapter 👇

1. Connect all batteries to the RS485 battery monitor or the BT2 to give the batteries individual addresses.

2. Disconnect the batteries from the RS485 battery monitor or the BT2 and connect them to the USB to RS485 adapter which is connected to the GX device.

3. Specify the MODBUS addresses in the `config.ini` at the `MODBUS_ADDRESSES` parameter.

  For example, if you are using three batteries the parameter would be `MODBUS_ADDRESSES = 0x30, 0x31, 0x32`.

| Battery count | MODBUS address |
| :---:         | :---:          |
| `1`           | `0x30`         |
| `2`           | `0x31`         |
| `3`           | `0x32`         |
| `4`           | `0x33`         |
| `5`           | `0x34`         |
| `6`           | `0x35`         |
| `7`           | `0x36`         |
| `8`           | `0x37`         |
| `9`           | `0x38`         |
| `10`          | `0x39`         |
| `11`          | `0x3a`         |
| `12`          | `0x3b`         |
| `13`          | `0x3c`         |
| `14`          | `0x3d`         |
| `15`          | `0x3e`         |
| `16`          | `0x3f`         |

See also [Renogy - Multi battery setup documentation](https://github.com/Louisvdw/dbus-serialbattery/issues/1099).
