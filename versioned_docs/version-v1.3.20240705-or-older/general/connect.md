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

Connect your BMS via the PC software ([BmsMonitor](https://www.dalybms.com/download-pc-software/)) and set the `Sleep time(S)` to `65535` to prevent the BMS from going to sleep.

If you are using multiple batteries you also have to make sure, that the `Battery code` is different on every battery.

![VenusOS](../screenshots/daly-bms_bms-monitor-screenshot-parameter-settings.png)


## EG4 LiFePower

For EG4 LiFePower batteries, you need to set your DIP switch pins to 1 for the battery connected to the Cerbo GX.

## JKBMS

* https://github.com/Louisvdw/dbus-serialbattery/discussions/250

* https://github.com/Louisvdw/dbus-serialbattery/discussions/578

## JKBMS PB Model (also know as JK Inverter BMS)

* https://github.com/Louisvdw/dbus-serialbattery/discussions/969
