---
id: index
title: Introduction
slug: /
sidebar_position: 1
---

# dbus-serialbattery
This driver is for Venus OS devices (any GX device sold by Victron or a Raspberry Pi running the Venus OS image).

The driver interfaces with a Battery Management System (BMS) that supports serial (RS232, RS485, or TTL UART), Bluetooth, and CAN communication (see [BMS feature comparison](./general/features#bms-feature-comparison) for details). The data is then published to the Venus OS system (dbus). Its primary function is to serve as a `Battery monitor` and `Controlling BMS` in your GX device, enabling the monitoring of key values and smooth control of battery charge/discharge.

## History
The first version of this driver was released by [Louisvdw](https://github.com/Louisvdw/dbus-serialbattery) in September 2020.

In February 2023 I ([mr-manuel](https://github.com/mr-manuel)) made my first PR, since Louis did not have time anymore to contribute to this project.

With the release of `v1.0.0` I became the main developer of this project. From then on, I have been maintaining the project and developing it further. I'm also solving 99% of the issues on GitHub.

A big thanks to [Louisvdw](https://github.com/Louisvdw/dbus-serialbattery) for the initiation of this project.

## Support this project
This project takes a lot of time and effort to maintain, answering support requests, adding new features and so on.
If you are using this driver and you are happy with it, please make a donation to support me and this project.

[<img src="https://github.md0.eu/uploads/donate-button.svg" style={{width: '178px', height: '38px'}} />](https://www.paypal.com/donate/?hosted_button_id=3NEVZBDM5KABW)

## Join the community on Discord
https://discord.gg/YXzFB8rSgx

## Requirements

* GX device or Raspberry Pi with Venus OS. The latest three stable versions of Venus OS are supported. It may also work on older and newer beta versions, but this is not guaranteed.

## Screenshots

### Venus OS

![VenusOS](../screenshots/venus-os_guiv2_001a.png)
![VenusOS](../screenshots/venus-os_guiv2_001b.png)
![VenusOS](../screenshots/venus-os_guiv2_001c.png)
![VenusOS](../screenshots/venus-os_guiv2_002.png)
![VenusOS](../screenshots/venus-os_guiv2_003.png)
![VenusOS](../screenshots/venus-os_guiv2_004.png)
![VenusOS](../screenshots/venus-os_guiv2_005.png)
![VenusOS](../screenshots/venus-os_guiv2_006.png)
![VenusOS](../screenshots/venus-os_guiv2_007.png)
![VenusOS](../screenshots/venus-os_guiv2_008.png)
![VenusOS](../screenshots/venus-os_guiv2_009.png)
![VenusOS](../screenshots/venus-os_guiv2_010.png)
![VenusOS](../screenshots/venus-os_guiv2_011.png)
![VenusOS](../screenshots/venus-os_guiv2_012.png)
![VenusOS](../screenshots/venus-os_guiv2_013.png)

### VRM Portal

![VenusOS](../screenshots/vrm-portal_001.png)
![VenusOS](../screenshots/vrm-portal_002.png)
![VenusOS](../screenshots/vrm-portal_003.png)
![VenusOS](../screenshots/vrm-portal_004.png)
![VenusOS](../screenshots/vrm-portal_005.png)
![VenusOS](../screenshots/vrm-portal_006.png)
![VenusOS](../screenshots/vrm-portal_007.png)
![VenusOS](../screenshots/vrm-portal_008.png)
![VenusOS](../screenshots/vrm-portal_009.png)
