---
id: connect
title: How to connect and prepare the battery/BMS
sidebar_position: 4
# Display h2 to h4 headings
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# How to connect and prepare the battery/BMS

> Make sure the data connection from the GX device to the BMS is isolated, see also [galvanic isolation](https://en.wikipedia.org/wiki/Galvanic_isolation).
> Otherwise you can damage your GX device and BMS, since the negative current will flow through the data cable, if the BMS disconnects the negative pole.

Since for some BMS the port labeling is a mess and not reflecting the real situation here are some useful instructions and links.

## Daly BMS

Connect your BMS via the PC software ([BmsMonitor](https://www.dalybms.com/download-pc-software/)) and set the `Sleep time(S)` to `65535` to prevent the BMS from going to sleep.

If you are using multiple batteries you also have to make sure, that the `Battery code` is different on every battery.

![VenusOS](../screenshots/daly-bms_bms-monitor-screenshot-parameter-settings.png)


## EG4 LiFePower

For EG4 LiFePower batteries, you need to set your DIP switch pins to 1 for the battery connected to the Cerbo GX.

## JKBMS

The JKBMS unfortunately has a wrong labeling. Here the correct pinout.

![VenusOS](../screenshots/jkbms-pinout.png)

![VenusOS](../screenshots/jkbms-cabeling.png)

See also [JK BMS JK-B2A8S20P RS-485 port / connector](https://github.com/Louisvdw/dbus-serialbattery/discussions/250) and [New JKBMS "JK_DZ11B1A24S" (balancer only)](https://github.com/Louisvdw/dbus-serialbattery/discussions/578).

## JKBMS PB Model (also know as JK Inverter BMS)

> 🌼🔗 Only if you want to connect multiple JKBMS PB BMS to the same RS485 adapter 👇

1. Give each battery a unique address using the jumper on the front. Do not use `_ _ _ _`, which corresponds to address `0x00`,
  as it sets the BMS into master mode, disabling RS485 communication. Then specify the MODBUS addresses in the `config.ini` at
  the `MODBUS_ADDRESSES` parameter.

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

2. Use a ethernet/CAT cable to connect all batteries via the RS485-2 ports. Both RS485-2 ports can be used.

3. Connect the first battery to your Cerbo/Raspberry using the RS485 to USB cable that came with the BMS.

4. In the JKBMS App ensure that the UART Protocol is set to the default `0/1`.

5. Reboot the system to apply the changes.

See also [Is anyone using the new style JK inverter BMS with dbus-serialbattery driver?](https://github.com/Louisvdw/dbus-serialbattery/discussions/969#discussioncomment-10987091).
