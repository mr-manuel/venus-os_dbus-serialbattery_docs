---
id: supported-bms
title: Supported BMS
sidebar_position: 3
# Display h2 to h4 headings
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Supported BMS

## Most used BMS

This are the three most used BMS with this driver.

🥇 JKBMS (68% of all systems)

🥈 Jiabaida JBD BMS (13% of all systems)

🥉 Daly BMS (12% of all systems)

The Daly BMS is not recommended, if you have to buy a new BMS, since it has a bad communication implementation and
sometimes it happens that the driver is not able to fetch data for a multiple cycles.

## Currently supported

### &bull; [ANT BMS](https://antbms.vip)

Disabled by default since driver version `v1.0.0` as it causes other issues. More informations can be found in [Add other use case (grid meter) or ignore devices - ANT BMS check missing](https://github.com/Louisvdw/dbus-serialbattery/issues/479) and if it was fixed. See [How to enable a disabled BMS](../general/install.md#how-to-enable-a-disabled-bms) to enable the BMS.

### &bull; [Daly BMS](https://dalybms.com/) 🥉 <small>Third most used BMS</small>

![Daly app](../screenshots/bms-daly.jpg)

### &bull; [Daren BMS](https://www-szdrgk-com.translate.goog/?_x_tr_sch=http&_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp)

DR-JC03, DR48100JC-03-V2, using the DR-1363 protocol. Tested with multiple packs on one RS485 USB-adapter.

More informations about the BMS and its protocol can be found [here](https://github.com/cpttinkering/daren-485/).

### &bull; [ECS](https://ecs-online.org) GreenMeter with LiPro

### &bull; [EG4](https://eg4electronics.com) LiFePOWER

Works also for:

#### |- [Revov](https://revov.co.za/)

#### |- [Tian Power](https://www.tian-power.com)

### &bull; [EG4](https://eg4electronics.com/) LL

### &bull; [Felicity Solar](https://www.felicitysolar.com/)

### &bull; KS48100

#### |- [Bemory](https://de.aliexpress.com/store/912104017)
#### |- [CERRNSS](https://cerrnss.com/)
#### |- [PAPool](https://www.aliexpress.com/store/1101978913)
#### |- [VoltPolska](https://voltpolska.pl/)

### &bull; [Litime BMS](https://www.litime.com)

Works also for:

#### |- [Power Queen](https://www.ipowerqueen.de)

#### |- [Redodo](https://www.redodopower.de)

### &bull; [Heltec Modbus SmartBMS](https://heltec-bms.com) / [YanYang BMS](http://en.yybms.com)

Communication to the Heltec SmartBMS (which is a rebranded YYBMS) via Modbus/RS485.

### &bull; [HLPdata](https://www.hlpdata.se) BMS4S

### &bull; [Jiabaida JBD BMS](https://dgjbd.en.alibaba.com/) 🥈  <small>Second most used BMS</small>

Works also for:

#### |- [LLT Power](https://www.lithiumbatterypcb.com/product-instructionev-battery-pcb-boardev-battery-pcb-board/ev-battery-pcb-board/smart-bms-of-power-battery/)

#### |- [Overkill Solar](https://overkillsolar.com/)

#### |- Smart BMS

#### |- Other BMS that use the Xiaoxiang phone app

### &bull; [JKBMS](https://www.jkbms.com) 🥇 <small>Most used BMS</small>

Works also for:

#### |- [Heltec BMS](https://heltec-bms.com)

### &bull; [JKBMS](https://www.jkbms.com) PB Model (also know as JK Inverter BMS)

### &bull; Kilovault

It's used in Kilovault HLX+ batteries. These were popular and imported by AltEStore, but Kilovault is out of business. OEM was [Topband](https://topband.com/)

### &bull; MNB spi BMS

Disabled by default as it requires additional manual steps to install.

### &bull; [Pace BMS](http://www.pacebms.com)

### &bull; [Renogy BMS](https://www.renogy.com)

### &bull; RV-C House battery

This driver supports the main house battery of RV-C protocol

### &bull; [Seplos](https://www.seplos.com)

So far only tested on version `16E`.

### &bull; [Seplos v3](https://www.seplos.com)

Works for the Seplos v3 BMS which uses different (Modbus) protocol than the earlier Seplos models.

### &bull; [Sinowealth](https://en.sinowealth.com)

Disabled by default since driver version `v0.14.0` as it causes other issues. See [How to enable a disabled BMS](../general/install.md#how-to-enable-a-disabled-bms) to enable the BMS.

### &bull; [Valence U-BMS](https://www.valence.com)

So far only tested together with 12V (4 cell) modules, i.e. https://www.valence.com/stackable-modules-12-819v/u27-12xp. 6 cell modules might require adaptations.

| Android | iOS |
| - |-|
| ![Xiaoxian app](../screenshots/bms-xiaoxian-android.jpg) | ![Xiaoxian app](../screenshots/bms-xiaoxian-ios.jpg) |

## Planned support

You can view the current [BMS requests](https://github.com/mr-manuel/venus-os_dbus-serialbattery/discussions/categories/new-bms-requests) to see which BMS support is requested and vote for the BMS you want to be supported.

## Add/Request new BMS

There are two possibilities to add a new BMS.

### Add by opening a pull request

Fork the repository and use the [`battery_template.py`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/tree/v2.0.20250729/dbus-serialbattery/bms/battery_template.py) as template to add a new battery. As soon as the BMS works you can open a pull request (PR) to merge it.

Here is a short checklist that should help you:

- [ ] 🚨 Make sure the GitHub Actions run fine in your repository. In order to make the GitHub Actions run please select in your repository settings under `Actions` -> `General` -> `Actions permissions` the option `Allow all actions and reusable workflows`. Check also in your repository settings under `Actions` -> `General` -> `Workflow permissions` if `Read and write permissions` are selected. After this changes you have to make a new commit, if you don't see any Actions run. This will check your code for Flake8 and Black Lint errors. [Here](https://py-vscode.readthedocs.io/en/latest/files/linting.html) is a short instruction on how to set up Flake8 and Black Lint checks in VS Code. This will save you a lot of time.
- [ ] Add your battery class and battery class import in alphabetical order in the [`etc/dbus-serialbattery/dbus-serialbattery.py`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/tree/v2.0.20250729/dbus-serialbattery/dbus-serialbattery.py)
- [ ] Add your BMS to the [BMS feature comparison](../general/features#bms-feature-comparison) page by editing [`docs/general/features.md`](https://github.com/mr-manuel/venus-os_dbus-serialbattery_docs/blob/master/docs/general/features.md)
- [ ] Add your BMS to the [Supported BMS](../general/supported-bms) page by editing [`docs/general/supported-bms.md`](https://github.com/mr-manuel/venus-os_dbus-serialbattery_docs/blob/master/docs/general/supported-bms.md)
- [ ] Do not import wildcards `*`
- [ ] If available populate `self.max_battery_charge_current` and `self.max_battery_discharge_current` with values read from the BMS
- [ ] If available populate `self.unique_identifier` with a unique value to distinguish the BMS in a multiple battery setup
- [ ] If your BMS don't run with the default settings add installation notes to the [How to install, update, disable, enable and uninstall](../general/install.md#bms-specific-settings) [`docs/general/install.md`](https://github.com/mr-manuel/venus-os_dbus-serialbattery_docs/blob/master/docs/general/install.md)
- [ ] If your BMS needs custom settings that the user should be able to change, add it below the `; --------- BMS specific settings ---------` section in the [`etc/dbus-serialbattery/config.default.ini`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/tree/v2.0.20250729/dbus-serialbattery/config.default.ini)
- [ ] Add the new BMS to the available BMS list under `; --------- Additional settings ---------` in the [`config.default.ini`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/tree/v2.0.20250729/dbus-serialbattery/config.default.ini)
- [ ] Add an entry to the [CHANGELOG.md](https://github.com/mr-manuel/venus-os_dbus-serialbattery/tree/v2.0.20250729/CHANGELOG.md)
- [ ] Add an entry in the issue template [`bug_report.yml`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/tree/v2.0.20250729/.github/ISSUE_TEMPLATE/bug_report.yml?plain=1) under `id: bms_type`
- [ ] Add an entry in the issue template [`support_request.yml`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/tree/v2.0.20250729/.github/ISSUE_TEMPLATE/support_request.yml?plain=1) under `id: bms_type`

### Request by opening a discussion

Start a [new discussion](https://github.com/mr-manuel/venus-os_dbus-serialbattery/discussions/new?category=new-bms-requests) in the `New BMS request` category. Please add also the protocol documentation which you can request from the manufacturer/seller. The more upvotes the BMS request has, the higher is the priority.

If you would like to donate hardware or would like to help testing a specific BMS please get in contact over the [discussions section](https://github.com/mr-manuel/venus-os_dbus-serialbattery/discussions).
