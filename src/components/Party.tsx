import React, { useContext } from "react";
import { PartyContext } from "../contexts";
import { getRange } from "../lib";
import { MobsState } from "../App";
import { getPartyPowerLevel } from "../domain";

export type TParty = {
  count: number;
  level: number;
  customCreatures: MobsState;
};

export const Party = () => {
  const [party, setParty] = useContext(PartyContext);
  const onChangeCount = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setParty((prevParty) => {
        return { ...prevParty, count: parseInt(e.target.value) };
      });
    },
    []
  );

  const onChangeLevel = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setParty((prevParty) => {
        return { ...prevParty, level: parseInt(e.target.value) };
      });
    },
    []
  );

  const validCounts = getRange([1, 12]);
  const validLevels = getRange([1, 20]);
  return (
    <div className="party">
      <h2>Party</h2>
      <label htmlFor="character-count">number of characters</label>
      <select id="character-count" value={party.count} onChange={onChangeCount}>
        {validCounts.map((value) => (
           <option value={value} key={`character-count-${value}`}>{value}</option>
        ))}
      </select>

      <label htmlFor="character-level">level</label>
      <select id="character-level" value={party.level} onChange={onChangeLevel}>
        {validLevels.map((value) => (
          <option value={value} key={`character-level-${value}`}>{value}</option>
        ))}
      </select>
      <div>Party total PEL: {getPartyPowerLevel(party)}</div>
    </div>
  );
};
