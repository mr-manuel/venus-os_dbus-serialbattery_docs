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
- State of Health (SoH) (where BMS supports)
- Heating status and allow to heat (where BMS supports)

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
- SoC calculation: Calculate SoC based on coulomb-counting in the driver and apply current correction if needed (optional)
- SoC reset via driver on BMS: Reset BMS SoC to 100% when battery switches to float (optional, not available for all)
- Choose BMS disconnect behavior
- Linear/step calculation of `CVL`, `CCL`, and `DCL`
- Use external current sensor, e.g., SmartShunt (optional)
- Charge voltage limitation: automatically switch `CVL` from bulk/absorption voltage to float voltage when the battery is full, and back when needed (optional)
- Set `CVL` based on cell voltage to prevent overvoltage of a single cell (optional)
- `CVL` cell OVP recovery with configurable hold period and ramp rate after an over-voltage condition clears (optional)
- Set `CCL` and `DCL` based on cell voltage to reduce cell stress (optional)
- Set `CCL` and `DCL` based on temperature to reduce cell stress (optional)
- Set `CCL` and `DCL` based on MOSFET temperature to reduce BMS stress (optional)
- Set `CCL` and `DCL` based on SoC to reduce cell stress (optional)
- `CCL` and `DCL` recovery with configurable hold period and ramp rate after a limiting condition clears
- Time-to-go
- Time to custom SoC (multiple points can be specified)
- Battery history tracking (charge cycles, energy counters, min/max values)
- Current correction via configurable measurement mapping (optional)
- Voltage drop compensation between BMS and charger (optional)
- Midpoint voltage simulation (optional)
- Publish battery data as JSON via MQTT (optional)
- Telemetry reporting to help improve the driver (anonymous, can be disabled)

For more details and other options, check the [`config.default.ini`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/blob/master/dbus-serialbattery/config.default.ini).

### SoC reset voltage

Some BMS need a higher voltage to trigger a reset to 100% SOC. `SOC_RESET_CELL_VOLTAGE` allows you to trigger this voltage once in a while. The driver will suppress high voltage warnings from the driver when it switches to this voltage. It might be that other systems (like the MultiPlus or Solar Charger) trigger a high voltage warning in this case when not properly configured.

See the `SOC reset voltage` section in the [`config.default.ini`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/blob/master/dbus-serialbattery/config.default.ini) for more information.

This has nothing to do with the `SOC calculation` or `SOC reset via driver on BMS`.

## SoC calculation

Many BMS have problems managing a SOC reset properly. To work around this, you can enable the SOC calculation of the driver. This ignores the SOC of the BMS and calculates it based on coulomb-counting (counting the current flowing in and out).

It's also possible to create a map to correct wrong current measurements.

See the `SOC calculation` section in the [`config.default.ini`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/blob/master/dbus-serialbattery/config.default.ini) for more information.

This has nothing to do with the `SOC reset voltage` or `SOC reset via driver on BMS`.

## SoC reset via driver on BMS

Some BMS do not reset the SoC automatically when the battery is full. This option allows the driver to reset the SoC of the BMS when it switches the `CVL` from absorption to float.

See `AUTO_RESET_SOC` in the [`config.default.ini`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/blob/master/dbus-serialbattery/config.default.ini) for more information.

This has nothing to do with the `SOC calculation` or `SOC reset voltage`.

## Limitation modes

The `CVL`, `CCL` and `DCL` limits can be applied in Step or Linear mode.

- **Linear** (mode 1, default) gives a gradual change from one limit range to the next, with smoother transitions
- **Step** (mode 2) uses hard boundaries that apply fixed step values and uses less processing power

## Charge voltage control management

### Cell voltage limitation (CVL cell OVP)

When a cell exceeds `MAX_CELL_VOLTAGE`, the driver lowers the charge voltage limit (`CVL`) to protect that cell from over-voltage while the rest of the pack continues to balance. There are three controller modes (`CVL_CONTROLLER_MODE`):

1. **P-Controller (penalty sum):** The voltage overshoot of all cells above `MAX_CELL_VOLTAGE` is summed and subtracted from `CVL`.
2. **I-Controller:** Gradually adjusts `CVL` to keep the highest cell at `MAX_CELL_VOLTAGE` + `SWITCH_TO_FLOAT_CELL_VOLTAGE_DIFF`.
3. **Clipped sum controller:** A logic-based limiting controller that caps the total charge voltage based on individual cell overvoltage, with a small margin for balancing.

After the OVP condition clears, `CVL` recovers with a configurable hold period (`CVL_RECOVERY_HOLD_SEC`) followed by a gradual ramp (`CVL_RECOVERY_RATE_V_PER_SEC`).

Detailed info on the P-Controller can be found here: [CCL/DCL depending on cell-voltage does not turn off charging completely, still overvoltage alarm](https://github.com/Louisvdw/dbus-serialbattery/issues/297#issuecomment-1327142635)

### Charge voltage limitation (float switching)

If the `MAX_CELL_VOLTAGE` \* `cell count` is reached and cells are balanced, the `CVL` drops to `FLOAT_CELL_VOLTAGE` \* `cell count` after `SWITCH_TO_FLOAT_WAIT_FOR_SEC` seconds. The `CVL` returns to max voltage when the SoC drops below `SWITCH_TO_BULK_SOC_THRESHOLD` or the cell voltage difference exceeds `SWITCH_TO_BULK_CELL_VOLTAGE_DIFF`. This is controlled by `CVCM_ENABLE`.

## Charge/Discharge current control management

CCCM/DCCM limits the current when the battery is close to full or close to empty.

When your battery is full, the reduced charge current will give the balancers in your BMS time to work.

When your battery is close to empty the reduced discharge current will prevent a sudden large load from pulling your battery cells below their protection values.

### CCCM/DCCM attributes

You can set CCCM/DCCM limits for 4 attributes which can be enabled / disabled and adjusted by settings in the `config.ini`.

The smallest limit from all enabled will apply.

When a limiting condition clears, the current does not jump back immediately. A configurable hold period (`CCL_RECOVERY_HOLD_SEC` / `DCL_RECOVERY_HOLD_SEC`) ensures the condition has genuinely stabilized, after which the current ramps back up at a configurable rate (`CCL_RECOVERY_RATE_A_PER_SEC` / `DCL_RECOVERY_RATE_A_PER_SEC`) to avoid large demand spikes.

Check the [`config.default.ini`](https://github.com/mr-manuel/venus-os_dbus-serialbattery/blob/master/dbus-serialbattery/config.default.ini) for more information.

### Cell voltage

- `CCCM_CV_ENABLE = True/False`
- `DCCM_CV_ENABLE = True/False`

CCCM/DCCM limits the charge/discharge current depending on the highest/lowest cell voltages.

### Temperature

- `CCCM_T_ENABLE = True/False`
- `DCCM_T_ENABLE = True/False`

CCCM/DCCM limits the charge/discharge current depending on the highest/lowest temperature sensor values.

### MOSFET Temperature

- `CCCM_T_MOSFET_ENABLE = True/False`
- `DCCM_T_MOSFET_ENABLE = True/False`

CCCM/DCCM limits the charge/discharge current depending on the MOSFET temperature sensor value.

### SoC (State of Charge) from the BMS

- `CCCM_SOC_ENABLE = True/False`
- `DCCM_SOC_ENABLE = True/False`

CCCM/DCCM limits the charge/discharge current depending on the SoC.

## BMS feature comparison

All drivers are UART/TTL or RS485, except those with BLE or CAN in the name. BLE stands for Bluetooth connection, and CAN stands for CAN bus connection.

Some BMS drivers support also BMS from other manufacturers. Check the [Supported BMS](./supported-bms.md) page for more info.

Generic drivers can provide all features, but the actual features you get depend on what your BMS supports.

| Feature                               | ANT | Daly | Daly CAN | Daren485 | ECS                | EG4 LiFePOWER | EG4 LL | Felicity Solar | Generic MQTT | Heltec Modbus | HLPdata BMS4S | JKBMS            | JKBMS BLE <sup>(3)</sup> | JKBMS CAN | JKBMS CAN V2 <sup>(5)</sup> | JKBMS PB Model | Kilovault HLX+ | KS48100 | LiTime BMS | LLT/JBD | LLT/JBD BLE <sup>(3)</sup> | LLT/JBD CAN | LLT/JBD UP16S      | MNB <sup>(1)</sup> | Pace BMS | Renogy | RV-C CAN | Seplos | Seplos v3 | Sinowealth <sup>(1)</sup> | Valence U-BMS CAN | XDZN BLE <sup>(3)</sup> |
| ------------------------------------: | :-: | :--: | :------: | :------: | :----------------: | :-----------: | :----: | :------------: | :----------: | :-----------: | :-----------: | :--------------: | :----------------------: | :-------: | :-------------------------: | :------------: | :------------: | :-----: | :--------: | :-----: | :------------------------: | :---------: | :----------------: | :----------------: | :------: | :----: | :------: | :----: | :-------: | :-----------------------: | :---------------: | :---------------------: |
| Voltage                               | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | Yes            | Yes          | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes                         | Yes            | Yes            | Yes     | Yes        | Yes     | Yes                        | Yes         | Yes                | Yes                | Yes      | Yes    | Yes      | Yes    | Yes       | Yes                       | Yes               | Yes                     |
| Current                               | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | Yes            | Yes          | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes                         | Yes            | Yes            | Yes     | Yes        | Yes     | Yes                        | Yes         | Yes                | Yes                | Yes      | Yes    | Yes      | Yes    | Yes       | Yes                       | Yes               | Yes                     |
| Power                                 | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | Yes            | Yes          | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes                         | Yes            | Yes            | Yes     | Yes        | Yes     | Yes                        | Yes         | Yes                | Yes                | Yes      | Yes    | Yes      | Yes    | Yes       | Yes                       | Yes               | Yes                     |
| State of Charge                       | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | Yes            | Yes          | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes                         | Yes            | Yes            | Yes     | Yes        | Yes     | Yes                        | Yes         | Yes                | Yes                | Yes      | Yes    | Yes      | Yes    | Yes       | Yes                       | Yes               | Yes                     |
| Battery temperature                   | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | Yes            | Yes          | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes                         | Yes            | Yes            | Yes     | Yes        | Yes     | Yes                        | Yes         | Yes                | Yes                | Yes      | Yes    | Yes      | Yes    | Yes       | Yes                       | Yes               | Yes                     |
| MOSFET temperature                    | No  | No   | No       | Yes      | No                 | No            | No     | Yes            | Yes          | Yes           | No            | Yes              | Yes                      | Yes       | Yes                         | Yes            | No             | Yes     | Yes        | Yes     | Yes                        | No          | Yes                | No                 | Yes      | No     | No       | No     | Yes       | No                        | No                | Yes                     |
| Capacity installed                    | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | No             | Yes          | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes                         | Yes            | Yes            | Yes     | Yes        | Yes     | Yes                        | Yes         | Yes                | Yes                | Yes      | Yes    | Yes      | Yes    | Yes       | Yes                       | No                | Yes                     |
| Capacity available                    | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | No             | Yes          | No            | Yes           | Yes              | Yes                      | Yes       | Yes                         | Yes            | Yes            | Yes     | Yes        | Yes     | Yes                        | Yes         | Yes                | Yes                | Yes      | Yes    | Yes      | Yes    | Yes       | Yes                       | No                | Yes                     |
| Capacity consumed                     | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | No             | Yes          | No            | Yes           | Yes              | Yes                      | Yes       | Yes                         | Yes            | Yes            | Yes     | Yes        | Yes     | Yes                        | Yes         | Yes                | Yes                | Yes      | Yes    | Yes      | Yes    | Yes       | Yes                       | No                | Yes                     |
| Min/max cell voltages                 | Yes | Yes  | Yes      | Yes      | No                 | Yes           | No     | Yes            | Yes          | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes                         | Yes            | Yes            | Yes     | No         | Yes     | Yes                        | Yes         | Yes                | No                 | Yes      | Yes    | No       | Yes    | Yes       | Yes                       | Yes               | Yes                     |
| Min/max temperature                   | Yes | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | Yes            | Yes          | No            | Yes           | Yes              | Yes                      | Yes       | Yes                         | Yes            | No             | Yes     | No         | Yes     | Yes                        | Yes         | Yes                | Yes                | Yes      | Yes    | No       | Yes    | Yes       | Yes                       | No                | Yes                     |
| Balancing status                      | Yes | No   | No       | No       | Yes                | Yes           | No     | No             | Yes          | Yes           | No            | Yes              | Yes                      | Yes       | Yes                         | Yes            | No             | No      | Yes        | No      | No                         | No          | Yes <sup>(7)</sup> | No                 | No       | No     | No       | No     | Yes       | No                        | Yes               | No                      |
| Allow to charge state                 | Yes | Yes  | Yes      | Yes      | Yes                | No            | No     | Yes            | Yes          | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes                         | Yes            | No             | Yes     | Yes        | Yes     | Yes                        | No          | Yes                | Yes                | No       | No     | Yes      | Yes    | Yes       | Yes                       | No                | Yes                     |
| Allow to discharge state              | Yes | Yes  | Yes      | Yes      | Yes                | No            | No     | Yes            | Yes          | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes                         | Yes            | No             | Yes     | Yes        | Yes     | Yes                        | No          | Yes                | Yes                | No       | No     | Yes      | Yes    | Yes       | Yes                       | No                | Yes                     |
| Allow to balance state                | No  | Yes  | Yes      | No       | No                 | No            | No     | No             | Yes          | No            | No            | Yes              | Yes                      | Yes       | Yes                         | Yes            | No             | No      | Yes        | Yes     | Yes                        | No          | No                 | No                 | No       | No     | No       | No     | Yes       | No                        | No                | No                      |
| Single cell details                   | No  | Yes  | Yes      | Yes      | Yes                | Yes           | Yes    | Yes            | Yes          | Yes           | Yes           | Yes              | Yes                      | No        | Yes                         | Yes            | Yes            | Yes     | Yes        | Yes     | Yes                        | No          | Yes                | No                 | Yes      | Yes    | No       | Yes    | Yes       | Yes                       | Yes               | Yes                     |
| Raise alarms from the BMS             | Yes | Yes  | Yes      | Yes      | Yes <sup>(2)</sup> | Yes           | Yes    | Yes            | Yes          | Yes           | Yes           | Yes              | Yes                      | Yes       | Yes                         | Yes            | Yes            | Yes     | No         | Yes     | Yes                        | No          | Yes                | Yes                | Yes      | Yes    | Yes      | Yes    | Yes       | Yes                       | Yes               | Yes                     |
| Daisy chain BMS with one cable        | No  | Yes  | Yes      | Yes      | No                 | Yes           | Yes    | Yes            | Yes          | Yes           | No            | Yes <sup>4</sup> | Yes <sup>4</sup>         | No        | Yes <sup>6</sup>            | Yes            | No             | Yes     | No         | No      | No                         | Yes         | Yes                | No                 | No       | Yes    | No       | No     | No        | No                        | Not yet           | No                      |
| History of charge cycles              | Yes | Yes  | Yes      | Yes      | No                 | Yes           | No     | No             | Yes          | No            | No            | Yes              | Yes                      | Yes       | Yes                         | Yes            | No             | Yes     | Yes        | Yes     | Yes                        | Yes         | Yes                | No                 | No       | Yes    | No       | Yes    | Yes       | Yes                       | No                | No                      |
| Get CCL/DCL from the BMS              | No  | No   | No       | Yes      | No                 | No            | No     | Yes            | Yes          | Yes           | No            | Yes              | Yes                      | Yes       | Yes                         | No             | No             | No      | No         | No      | No                         | Yes         | Yes                | No                 | No       | No     | Yes      | No     | Yes       | No                        | Yes               | No                      |
| SOC reset via driver on BMS           | No  | Yes  | No       | No       | No                 | No            | Yes    | No             | Yes          | No            | No            | No               | Yes                      | No        | No                          | No             | No             | No      | No         | Yes     | Yes                        | No          | Yes <sup>(7)</sup> | No                 | No       | No     | No       | No     | No        | No                        | No                | No                      |
| Disable charging via driver on BMS    | No  | Yes  | Yes      | No       | No                 | No            | No     | No             | Yes          | No            | No            | No               | No                       | No        | No                          | No             | No             | No      | No         | Yes     | Yes                        | No          | No                 | No                 | No       | No     | No       | No     | No        | No                        | No                | No                      |
| Disable discharging via driver on BMS | No  | Yes  | Yes      | No       | No                 | No            | No     | No             | Yes          | No            | No            | No               | No                       | No        | No                          | No             | No             | No      | No         | Yes     | Yes                        | No          | No                 | No                 | No       | No     | No       | No     | No        | No                        | No                | No                      |
| Disable balancing via driver on BMS   | No  | Yes  | Yes      | No       | No                 | No            | No     | No             | Yes          | No            | No            | No               | No                       | No        | No                          | No             | No             | No      | No         | Yes     | Yes                        | No          | No                 | No                 | No       | No     | No       | No     | No        | No                        | No                | No                      |

(1) Disabled by default. They can be enabled by adding them to the `BMS_TYPE` setting in `config.ini`. See [How to enable a disabled BMS](../general/install.md#how-to-enable-a-disabled-bms).

(2) No cells yet.

(3) The BLE connection is still not stable on some systems. For a stable connection, use the serial connection. It may work for you, but it's not guaranteed.

(4) Available only on models released in 2023 and later, where you can set the `Device Addr.`.

(5) Works with JKBMS and JK Inverter BMS. Available only on models with CAN module and released in 2023 and later.

(6) Currently, this feature is only available for the JK Inverter BMS, which has physical dip switches to change the address. This is a JKBMS firmware limitation.

(7) Cell balancing status and SOC reset on JBD UP16S is supported for master, but support for these features for daisy-chained batteries depends on your setup, see [this section](./connect.md#jbd-bms) for details.
