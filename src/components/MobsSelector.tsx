import { useContext, useState } from "react";
import { Creature } from "../5etools";
import { CreatureContext, MobsContext } from "../contexts";
import { clampInt, truncateToTwoDecimals } from "../lib";
import { powerLevelByCr } from "../power-level-data";

export const MobsSelector = () => {
  const [filterQuery, setFilterQuery] = useState("");
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const creatures = useContext(CreatureContext);
  const [mobs, setMobs] = useContext(MobsContext);

  const sortCreatures = (
    a: { cr: number; name: string },
    b: { cr: number; name: string }
  ) => {
    if (sortField === "cr") {
      if (a.cr === b.cr) {
        // Sub-sort by name if 'cr' is the same
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return sortDirection === "asc" ? a.cr - b.cr : b.cr - a.cr;
    }

    // Default to name sorting
    return sortDirection === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  };

  const filteredCreatures = creatures
    .filter((creature) =>
      creature.name.toLowerCase().includes(filterQuery.toLowerCase())
    )
    .sort(sortCreatures);

  const addToMobsList = (creature: Creature) => {
    setMobs((prevMobs) => {
      const { name, id, powerLevel } = creature;
      return {
        ...prevMobs,
        [id]: {
          // add "baseCr: null" herebecause getAllMobsPowerLevel() needs it
          // for calculating the total power level of a mix
          // of Creature objects and LeveledNpc objects
          // -> LeveledNpc objects may have a baseCr in addition to a power level
          baseCr: null,
          creatureName: name,
          powerLevel: powerLevel,
          mobSize: !!prevMobs[id] ? clampInt(prevMobs[id].mobSize + 1) : 1,
        },
      };
    });
  };

  const filterCreatureNames = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(e.target.value);
  };

  const handleSort = (field: string) => {
    const isSameField = sortField === field;
    const newDirection =
      isSameField && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
  };

  const renderSortIndicator = (field: string) => {
    return sortField === field ? (sortDirection === "asc" ? " ▲" : " ▼") : "";
  };

  type PowerLevelFractionsByCrFloats = { [powerLevelFraction: number]: string };
  const powerLevelFloatsByCr: PowerLevelFractionsByCrFloats = { 0: "1/3", 0.125: "2/3", 0.5: "1 1/2" };

  // FIXME: has to check CR, not Powerlevel
  const formatPowerLevel = (cr: number) => {
     return powerLevelFloatsByCr[cr] ? powerLevelFloatsByCr[cr] : powerLevelByCr[cr]
  }

  return (
    <div className="mobs-selector">
      <input
        type="text"
        placeholder="Enter creature name"
        value={filterQuery}
        onChange={filterCreatureNames}
        className="filter-input"
      />
      <table className="creatures-table">
        <thead>
          <tr>
            <th></th>
            <th>
              <button
                onClick={() => handleSort("name")}
                className="sort-button"
              >
                Name{renderSortIndicator("name")}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("cr")} className="sort-button">
                CR{renderSortIndicator("cr")}
              </button>
            </th>
            <th>PEL</th>
          </tr>
        </thead>
        <tbody>
          {filteredCreatures.map((creature) => (
            <tr key={`${creature.name}-${creature.cr}-${creature.id}`}>
              <td>
                <button
                  onClick={() => addToMobsList(creature)}
                  className="increment-button"
                >
                  +
                </button>
              </td>
              <td>{creature.name}</td>
              <td>{creature.cr}</td>
              <td>{formatPowerLevel(creature.cr)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
