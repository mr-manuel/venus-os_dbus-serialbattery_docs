---
id: install
title: How to install, update, disable, enable and uninstall
sidebar_position: 5
# Display h2 to h4 headings
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# How to install, update, disable, enable and uninstall

## 🚨 NB! Before you begin 🚨

> The driver does not do any setup of your BMS/battery. You need to have a working battery before you start.

> **Multi battery setup**<br />
> In Venus OS only one battery can be selected for controlling CVL, CCL and DCL. This battery then controls the whole system. Also for displaying the battery values in the overview (GUI and VRM) only one battery can be selected. Therefore you need to use a battery aggregator. See [How to aggregate multiple batteries?](../faq/index.md#how-to-aggregate-multiple-batteries)

> The Bluetooth connection is still not stable on some systems. If you want to have a stable connection use the serial connection.

> It is always recommended to use the latest Venus OS version with the latest driver version. To avoid a [white screen](../faq/index.md#fix-white-screen-after-install) after install check the compatibility matrix below.

## Compatibility Matrix

The latest three stable versions of Venus OS are supported. It may also work on older and newer beta versions, but this is not guaranteed.

| &darr; Venus OS version \ Driver version &rarr;  | v0.12.0  | v0.13.0  | v0.14.x              | v1.x.x   |
| ---                                              | :---:    | :---:    | :---:                | :---:    |
| v2.80 - v2.84                                    | ok       | ok       | untested             | untested |
| v2.85 - v2.89                                    | ok       | ok       | untested             | untested |
| v2.90 - v2.94                                    | untested | ok       | ok                   | ok       |
| v3.00 - v3.4x                                    | untested | untested | not supported        | ok       |


## Default hard limits

The driver currently implement some hard limits. Make sure your device is set up correctly and can handle these limits before you install.

 * `50A` charge
 * `60A` discharge
 * `2.9V` min cell voltage
 * `3.45V` max cell voltage

The cell voltages is used along with the cell count to set the battery voltage (e.g. for 16 cells your battery min voltage will be `3.1 * 16 = 49.6V` and max coltage `3.45 * 16 = 55.2V`)

This limits can be changed in the settings. See [How to change the default limits](#how-to-change-the-default-limits) and [Settings location/path](#settings-locationpath).

## Settings for your BMS/battery

You need to first set up your BMS hardware to match your cells. You would do this, if you build you own battery or your manufacturer/installer have done this for you.
The important steps:

 * Use the same cells (type, branch and capacity) and make sure they are balanced.
 * You need to correctly set your battery capacity to match the cells you are using. Your SoC calculation in your BMS will be wrong otherwise. If you use `120Ah` cells then your battery capacity will be `120Ah` etc.
 * You need to correctly set your min/max cell protection voltages. These are voltages when your BMS will disconnect to protect your cells like `2.85V` and `3.65V`. Your driver limits should be between these and NOT the same.

For BMS specific settings check the [How to connect and prepare the battery/BMS](./connect.md) page.

## Settings for your GX device

1. You need to have a Venus OS device set up and running on your GX system (VenusGX, Cerbo, Raspberry Pi, etc.) and connected to your inverter.
In [VRM](https://vrm.victronenergy.com/) look under the device list for your installation. If you can see the Gateway (GX) and Ve.Bus System (inverter) then your GX is ready.

2. On your GX device you should set DVCC On. This will enable your battery to request charge parameters. All the Share Sense option can be Off. If your battery works with lower limits, enable Limit Charge Current, Limit managed battery Charge Voltage and set the lower values as required. You can also enable Limit inverter power for Discharge Current limit under ESS. These settings will be remembered between updates.

![DVCC values](../screenshots/settings-dvcc.png)

3. You also need to connect your BMS to the Venus OS device using a serial interface. Use the cable for your BMS or a Victron branded USB&rarr;RS485 or USB&rarr;Ve.Direct (RS232) cable for best compatibility. Most FTDI/FT232R/CH340G USB&rarr;serial also works. The FT232R and CH340G already has a driver included in the Venus OS.

  > 🚨 **NB! Only connect Rx & Tx or A & B to the BMS,** if you are NOT using an isolated ([galvanic isolation](https://en.wikipedia.org/wiki/Galvanic_isolation)) cable or adapter. This prevents the current to flow through the adapter, if the BMS cuts the ground. Else it will destroy your BMS, GX device or Raspberry Pi.

## Install or update

### Install or update automatically with USB/SD card

> 🚨 IMPORTANT! Read the [changelog](https://github.com/mr-manuel/venus-os_dbus-serialbattery/blob/v1.4.20240928/CHANGELOG.md) BEFORE updating to a new version.

> It might be, that this doesn't work on older CerboGX devices. In this case use SSH option instead.

1. Download and copy the [latest release](https://github.com/mr-manuel/venus-os_dbus-serialbattery/releases) `venus-data.tar.gz` to the root of a USB flash drive that is in FAT32 format (a SD card is also an option for GX devices, but not for Raspberry Pi).

1. OPTIONAL: Create a `config.ini` file in the root of your USB flash drive with your custom settings. Put `[DEFAULT]` in the first line of the file and add all the values you want to change below. You only have to insert the values you want to change, all other values are fetched from the `config.default.ini`. In the [`config.default.ini`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/blob/v1.4.20240928/etc/dbus-serialbattery/config.default.ini) you find all possible settings that you can copy over and change.

   > If you put a `config.ini` in the root of the USB flash drive, then an existing `config.ini` will be overwritten.

1. Plug the flash drive/SD into the Venus device and reboot. It will automatically extract and install to the correct locations and try the driver on any connected devices.

1. Reboot the GX (in the Remote Console go to `Settings` &rarr; `General` &rarr; `Reboot?`).


### Install or update over SSH

> 🚨 IMPORTANT! Read the [changelog](https://github.com/mr-manuel/venus-os_dbus-serialbattery/blob/v1.4.20240928/CHANGELOG.md) BEFORE updating to a new version.

> Require [root access](https://www.victronenergy.com/live/ccgx:root_access#root_access)

1. Log into your Venus OS device using a SSH client like [Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) or bash.

1. Run these commands to start the installer.

  ```bash
  wget -O /tmp/install.sh https://raw.githubusercontent.com/mr-manuel/venus-os_dbus-serialbattery/refs/tags/v1.4.20240928/etc/dbus-serialbattery/install.sh

  bash /tmp/install.sh
  ```

1. You can now choose which version you want to install:

   1. [Latest release](#latest-release)
      Stable version, tested for more then a week.

   1. [Beta release](#beta-release)
      Beta version, no errors after 72 h runtime, long time testing needed.

   1. [Nightly build](#nightly-build)
      Nightly version, newest features and fixes, bugs possible.

   1. [Specific branch](#specific-branch)
      Nightly version, specific feature testing, bugs possible.

   1. [Specific version](#specific-versiontroubleshooting-option)

   1. [Local tar file](#local-tar-file)

#### Latest release

Stable version, tested for more then a week.

Run the [install script](#install-or-update-over-ssh) and select `1`.

💡 Reboot the system after the installation finished with `reboot`.

#### Beta release

Beta version, no errors after 72 h runtime, long time testing needed.

Run the [install script](#install-or-update-over-ssh) and select `2`.

💡 Reboot the system after the installation finished with `reboot`.

#### Nightly build

Nightly version, newest features and fixes, bugs possible. Please keep your system monitored.

> Not recommended in production environment, unless you know what you do. Testers are very welcome!

Run the [install script](#install-or-update-over-ssh) and select `3`.

💡 Reboot the system after the installation finished with `reboot`.

#### Specific branch

Nightly version, specific feature testing, bugs possible. Please keep your system monitored.

> Not recommended in production environment, unless you know what you do. Testers are very welcome!

Run the [install script](#install-or-update-over-ssh) and select `4`.

💡 Reboot the system after the installation finished with `reboot`.

#### Specific version/troubleshooting option

Run the [install script](#install-or-update-over-ssh) and select `5`. Go to [releases](https://github.com/mr-manuel/venus-os_dbus-serialbattery/releases) and copy the link to the `venus-data.tar.gz` version you like to install. Paste the link with a right click and press enter.

💡 Reboot the system after the installation finished with `reboot`.

#### Local tar file

Place a `venus-data.tar.gz` file in the folder `/var/volatile/tmp/` by copying/uploading it. Run the [install script](#install-or-update-over-ssh) and select `6`.

💡 Reboot the system after the installation finished with `reboot`.


### BMS specific settings

* Daly BMS &rarr; Check [Why is the battery current inverted?](../faq/index.md#why-is-the-battery-current-inverted) and [Daly Lost Connection because of standby](https://github.com/Louisvdw/dbus-serialbattery/issues/731#issuecomment-1613580083)
* ECS BMS &rarr; Check [#254 ECS BMS (comment)](https://github.com/Louisvdw/dbus-serialbattery/issues/254#issuecomment-1275924313)
* MNB BMS &rarr; Check [MNB BMS setup](https://github.com/Louisvdw/dbus-serialbattery/issues/590)

You can also get an overview of the BMS specific settings by checking the end of the [`config.default.ini`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/blob/v1.4.20240928/etc/dbus-serialbattery/config.default.ini).


### Get BMS MAC address

Execute this commands to scan for Bluetooth devices and get their MAC address:

**Command to execute**
```bash
bluetoothctl
```

**Output**
```
Agent registered
[CHG] Controller xx:xx:xx:xx:xx:xx Pairable: yes
```

**Command to execute**
```bash
scan on
```

**Output**
```
Discovery started
[CHG] Controller xx:xx:xx:xx:xx:xx Discovering: yes
[CHG] Device xx:xx:xx:xx:xx:xx RSSI: -60
```

**Command to execute**
```
devices
```

**Output with device MAC addresses**
```
Device xx:xx:xx:xx:xx:xx JK-B2A24S15P
```

**Command to execute**
```
scan off
```

**Output**
```
Discovery stopped
[CHG] Device xx:xx:xx:xx:xx:xx RSSI is nil
[CHG] Controller xx:xx:xx:xx:xx:xx Discovering: no
```

**Command to execute**
```
quit
```

## How to change the default limits

The driver currently uses a fixed upper current limit for the BMS:

* `50A` charge
* `60A` discharge

Should you require more current and your battery can handle that, than you can change it in the settings. The values to change are:

```ini
MAX_BATTERY_CHARGE_CURRENT = 50.0
MAX_BATTERY_DISCHARGE_CURRENT = 60.0
```

See [Settings location/path](#settings-locationpath).

If you use the cell voltage limits, temperature limits and/or SoC limits you also need to adjust their values to match the new current, else CCL and DCL will not change. See also [Why is the charging/discharging current limit (CCL/DCL) smaller than the set one?](../faq/index.md#why-is-the-chargingdischarging-current-limit-ccldcl-smaller-than-the-set-one).

## Settings location/path

💡 After updating the settings, reboot the device or run `/data/etc/dbus-serialbattery/reinstall-local.sh` to apply the changes.

Copy the values you want to change from `/data/etc/dbus-serialbattery/config.default.ini` and insert them in the `/data/etc/dbus-serialbattery/config.ini`.

All available options can also be found [here](https://github.com/mr-manuel/venus-os_dbus-serialbattery/blob/v1.4.20240928/etc/dbus-serialbattery/config.default.ini).

## How to edit the `config.ini`

There are two ways to edit the files. You can edit them:

* Directly on the GX device/Raspberry Pi over SSH
* On your PC and then copy only the `config.ini` over to the GX device/Raspberry Pi

### SSH edit using Nano editor (recommended)

Log into your GX device/Raspberry Pi using SSH and run this command. Replace `FILE_NAME` with the file name you want to edit, e.g. `config.ini`.

```bash
nano /data/etc/dbus-serialbattery/FILE_NAME
```

You can use the arrow keys to scroll down and edit the values you need.

Use `Ctrl + O` (O like Oskar) to save and `Ctrl + X` to exit the editor.

### Copy edited file from PC to GX device/Raspberry Pi

You can edit the file in a plain text editor on you PC like Notepad (Windows) or TextEdit (macOS). Then you need a program that can do SFTP like [FileZilla](https://filezilla-project.org/download.php?show_all=1) (Windows/macOS/Linux), [WinSCP](https://winscp.net/eng/downloads.php) (Windows) or [Cyberduck](https://cyberduck.io/download/) (macOS).

Connect to your GX using the same login as with SSH and copy your edited file over the existing one at `/data/etc/dbus-serialbattery/config.ini`.

⚠️ Sometimes it happens, that the line endings get changed from `LF` to `CRLF` with this method. Check the [FAQ --> `$'\r': command not found` or `syntax error: unexpected end of file`](../faq/index.md#r-command-not-found-or-syntax-error-unexpected-end-of-file) to solve.

> Don't copy all the files as the required file permissions will be destroyed and your driver might fail to start.

## How to enable a disabled BMS
If your BMS is disabled by default, you have to enable it to get it working.

💡 See also [How to edit the `config.ini`](#how-to-edit-the-configini) if you don't know how to edit a file.

Add your BMS to the setting `BMS_TYPE` in the `config.ini`. This way you don't have to enable your BMS after every update.


## Disable the driver
You can disable the driver so that it will not be run by the GX device. To do that run the following command in SSH.

```bash
bash /data/etc/dbus-serialbattery/disable.sh
```

You also need to configure your MPPTs to run in `Stand alone mode` again. Follow the Victron guide for [Err 67 - BMS Connection lost](https://www.victronenergy.com/live/mppt-error-codes#err_67_-_bms_connection_lost).

## Enable the driver
To enable the driver again you can run the installer.

```bash
bash /data/etc/dbus-serialbattery/reinstall-local.sh
```

## Uninstall/remove the driver

To uninstall the driver run the uninstall script.

```bash
bash /data/etc/dbus-serialbattery/uninstall.sh
```

**Remove**

If you want to remove also the install files of the driver run this after you run the uninstall script/commands:

```bash
rm -rf /data/etc/dbus-serialbattery
```
