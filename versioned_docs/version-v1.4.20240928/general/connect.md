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

## EG4 LiFePower

For EG4 LiFePower batteries, you need to set your DIP switch pins to 1 for the battery connected to the Cerbo GX.

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
