---
id: features
title: Features
sidebar_position: 2
---

# Features

The driver supports batteries with 3 to 32 cells.

## Modes

In Venus OS, you can use both features, one, or none.

- **Battery Monitor**
    - Displays battery settings on the brief and overview page.
    - Select the connected battery/BMS under `Settings -> System setup`.
- **Controlling BMS**
    - Controls charger and inverter parameters based on battery values for smooth battery regulation.
    - Select the connected battery/BMS under `Settings -> DVCC`.

## Provided Data

All listed data below depend on each [BMS capabilities](#bms-feature-comparison).

### Basic Data

- Voltage
- Current
- Power
- State of Charge (SoC)
- Battery temperatures
- MOSFET temperature
- Capacity (installed, used, available)
- Min/max cell voltage
- Min/max temperature
- Balancing state
- Allow to charge/discharge/balance state

### Cell Data

- Min/Max/Diff
- Cell count
- Cell voltages (1 - 32)
- Balancing cells (1 - 32)

### Alarms from BMS

- Low/High voltage alarm
- Low/High cell voltage
- Low SoC
- Cell imbalance
- High charge current
- High discharge current
- Low/High charge temperature
- Low/High temperature
- High internal temperature
- BMS cable fault

### Additional Data

- Charge cycle history

### Features/Data provided by the Driver

- Set battery parameters (`DVCC`)
    - Charge Voltage Limit (`CVL`)
    - Charge Current Limit (`CCL`)
    - Discharge Current Limit (`DCL`)
- Current average (last 5 minutes)
- SoC reset voltage: Temporarily apply higher voltage to reset BMS SoC to 100% (optional)
- SoC calculation: Calculate SoC based on coloumb-counting in the driver and apply current correction if needed (optional)
- SoC reset via driver on BMS: Reset BMS SoC to 100% when battery switches to float (optional, not available for all)
- Choose BMS disconnect behavior
- Linear/step calculation of `CVL`, `CCL`, and `DCL`
- Use external current sensor, e.g., SmartShunt (optional)
- Set `CVL` based on cell voltage to prevent overvoltage of a single cell (optional)
- Set `CCL` and `DCL` based on cell voltage to reduce cell stress (optional)
- Set `CCL` and `DCL` based on temperature to reduce cell stress (optional)
- Set `CCL` and `DCL` based on SoC to reduce cell stress (optional)
- Time-to-go
- Time to custom SoC (multiple points can be specified)

For more details and other options, check the [`config.sample.ini`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/blob/v1.5.20241215/etc/dbus-serialbattery/config.default.ini).

### SoC reset voltage

Some BMS need a higher voltage to trigger a reset to 100% SOC. `SOC_RESET_VOLTAGE` allows you to trigger this voltage once in a while. The driver will supress high voltage warnings from the driver

when it switches to this voltage. It might be that other systems (like the MultiPlus or Solar Charger) trigger a high voltage warning in this case when not properly configured.

See the `SOC reset voltage` section in the [`config.default.ini`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/blob/v1.5.20241215/etc/dbus-serialbattery/config.default.ini) for more informations.

This has nothing to do with the `SOC calculation` or `SOC reset via driver on BMS`.

## SoC calculation

Many BMS have problems to manage a SOC reset properly. To workaround this you can enable the SOC calculation of the driver.This ignores the SOC of the BMS and calculates it

based on coloumb-counting (count the current flowing in and out).

It's also possible to create a map to correct wrong current measurements.

See the `SOC calculation` section in the [`config.default.ini`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/blob/v1.5.20241215/etc/dbus-serialbattery/config.default.ini) for more informations.

This has nothing to do with the `SOC reset voltage` or `SOC reset via driver on BMS`.

## SoC reset via driver on BMS

Some BMS do not reset the SoC automatically, when the battery is full. This option allows the driver to reset the SoC of the BMS, when it swtiches the `CVL` from absorption to float.

See `AUTO_RESET_SOC` in the [`config.default.ini`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/blob/v1.5.20241215/etc/dbus-serialbattery/config.default.ini) for more informations.

This has nothing to do with the `SOC calculation` or `SOC reset voltage`.

## Limitation modes

The `CVL`, `CCL` and `DCL` limits can be applied in Step or Linear mode.

- **Step** use hard boundaries that will apply recognisable step values and use less processing power (DEFAULT)
- **Linear** will give a gradual change from one limit range to the next

## Charge voltage control management

### Cell voltage penalty

If the cell voltage reaches a specific value, then subtract a penalty from the CVL.

Detailed info can be found here: [CCL/DCL depending on cell-voltage does not turn off charging completely, still overvoltage alarm](https://github.com/Louisvdw/dbus-serialbattery/issues/297#issuecomment-1327142635)

### Float voltage emulation

If the `MAX_CELL_VOLTAGE` \* `cell count` is reached for `MAX_VOLTAGE_TIME_SEC` then the CVL changes to `FLOAT_CELL_VOLTAGE` \* `cell count`. Max voltage could be reached again if the SoC gets under `SOC_LEVEL_TO_RESET_VOLTAGE_LIMIT`.

## Charge current control management

CCCM limits the current when the battery is close to full or close to empty.

When your battery is full, the reduced charge current will give the balancers in your BMS time to work.

When your battery is close to empty the reduced dicharge current will limit that a sudden large load will pull your battery cells below their protection values.

### CCCM attributes

You can set CCCM limits for 3 attributes which can be enabled / disabled and adjusted by settings in the `config.ini`.

The smallest limit from all enabled will apply.

Check the [`config.default.ini`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/blob/v1.5.20241215/etc/dbus-serialbattery/config.default.ini) for more informations.

### Cell voltage

- `CCCM_CV_ENABLE = True/False`
- `DCCM_CV_ENABLE = True/False`

CCCM limits the charge/discharge current depending on the highest/lowest cell voltages.

### Temperature

- `CCCM_T_ENABLE = True/False`
- `DCCM_T_ENABLE = True/False`

CCCM limits the charge/discharge current depending on the highest/lowest temperature sensor values.

### SoC (State of Charge) from the BMS

- `CCCM_SOC_ENABLE = True/False`
- `DCCM_SOC_ENABLE = True/False`

CCCM limits the charge/discharge current depending on the SoC.

## BMS feature comparison

All drivers are UART/TTL or RS485, except those with BLE or CAN in the name. BLE stands for Bluetooth connection, and CAN stands for CAN bus connection.

Some BMS drivers support also BMS from other manifacturers. Check the [Supported BMS](./supported-bms.md) page for more info.

| Feature                               | ANT | Daly | Daly CAN | Daren485 | ECS                | EG4 LiFePOWER | EG4 LL | Heltec Modbus | HLPdata BMS4S | JKBMS            | JKBMS BLE <sup>(3)</sup> | JKBMS CAN | JKBMS PB Model | LLT/JBD | LLT/JBD BLE <sup>(3)</sup> | MNB <sup>(1)</sup> | Renogy | Seplos | Seplos v3 | Sinowealth <sup>(1)</sup> |
| ------------------------------------: | :-: | :--: | :------: | :------: | :----------------: | :-----------: | :----: | :-----------: | :-----------: | :--------------: | :----------------------: | :-------: | :------------: | :-----: | :------------------------: | :----------------: | :----: | :----: | :-------: | :-----------------------: |
| Voltage                               | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | Yes                | Yes    | Yes    | Yes       | Yes                       |
| Current                               | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | Yes                | Yes    | Yes    | Yes       | Yes                       |
| Power                                 | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | Yes                | Yes    | Yes    | Yes       | Yes                       |
| State of Charge                       | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | Yes                | Yes    | Yes    | Yes       | Yes                       |
| Battery temperature                   | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | Yes                | Yes    | Yes    | Yes       | Yes                       |
| MOSFET temperature                    | No  | No   | No       | Yes      | No                 | No            | No     | Yes           | No            | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | No                 | No     | No     | Yes       | No                        |
| Capacity installed                    | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | Yes                | Yes    | Yes    | Yes       | Yes                       |
| Capacity available                    | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | No            | Yes           | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | Yes                | Yes    | Yes    | Yes       | Yes                       |
| Capacity consumed                     | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | No            | Yes           | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | Yes                | Yes    | Yes    | Yes       | Yes                       |
| Min/max cell voltages                 | Yes | Yes  | Yes      | Yes      | No                 | Yes           | No     | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | No                 | Yes    | Yes    | Yes       | Yes                       |
| Min/max temperature                   | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | No            | Yes           | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | Yes                | Yes    | Yes    | Yes       | Yes                       |
| Balancing status                      | Yes | No   | No       | No       | Yes                | Yes           | No     | Yes           | No            | Yes              | Yes                      | Yes       | Yes            | No      | No                         | No                 | No     | No     | Yes       | No                        |
| Allow to charge state                 | Yes | Yes  | Yes      | Yes      | Yes                | No            | No     | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | Yes                | No     | Yes    | Yes       | Yes                       |
| Allow to discharge state              | Yes | Yes  | Yes      | Yes      | Yes                | No            | No     | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | Yes                | No     | Yes    | Yes       | Yes                       |
| Allow to balance state                | No  | No   | No       | No       | No                 | No            | No     | No            | No            | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | No                 | No     | No     | Yes       | No                        |
| Single cell details                   | No  | Yes  | No       | Yes      | Yes                | Yes           | Yes    | Yes           | Yes           | Yes              | Yes                      | No        | Yes            | Yes     | Yes                        | No                 | Yes    | Yes    | Yes       | Yes                       |
| Raise alarms from the BMS             | Yes | Yes  | Yes      | Yes      | Yes <sup>(2)</sup> | Yes           | Yes    | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | Yes                | Yes    | Yes    | Yes       | Yes                       |
| Daisy chain BMS with one cable        | No  | Yes  | No       | Yes      | No                 | Yes           | Yes    | Yes           | No            | Yes <sup>4</sup> | Yes <sup>4</sup>         | No        | Yes            | Not yet | Not yet                    | No                 | Yes    | No     | No        | No                        |
| History of charge cycles              | Yes | Yes  | Yes      | Yes      | No                 | Yes           | No     | No            | No            | Yes              | Yes                      | Yes       | Yes            | Yes     | Yes                        | No                 | Yes    | Yes    | Yes       | Yes                       |
| Get CCL/DCL from the BMS              | No  | No   | No       | Yes      | No                 | No            | No     | Yes           | No            | Yes              | Yes                      | Yes       | No             | No      | No                         | No                 | No     | No     | Yes       | No                        |
| SOC reset via driver on BMS           | No  | Yes  | No       | No       | No                 | No            | Yes    | No            | No            | No               | Yes                      | No        | No             | Yes     | Yes                        | No                 | No     | No     | No        | No                        |
| Disable charging via driver on BMS    | No  | Yes  | Yes      | No       | No                 | No            | No     | No            | No            | No               | No                       | No        | No             | Yes     | Yes                        | No                 | No     | No     | No        | No                        |
| Disable discharging via driver on BMS | No  | Yes  | Yes      | No       | No                 | No            | No     | No            | No            | No               | No                       | No        | No             | Yes     | Yes                        | No                 | No     | No     | No        | No                        |
| Disable balancing via driver on BMS   | No  | Yes  | Yes      | No       | No                 | No            | No     | No            | No            | No               | No                       | No        | No             | Yes     | Yes                        | No                 | No     | No     | No        | No                        |

(1) Disabled by default. They can be enabled by uncommenting in `dbus-serialbattery.py`.

(2) No cells yet.

(3) The BLE connection is still not stable on some systems. For a stable connection, use the serial connection. It may work for you, but it's not guaranteed.

(4) Available only on models released in 2023 and later, where you can set the `Device Addr.`.

(5) Works with JKBMS and JK Inverter BMS. Available only on models with CAN module and released in 2023 and later.

(6) Currently, this feature is only available for the JK Inverter BMS, which has physical dip switches to change the address. This is a JKBMS firmware limitation.
