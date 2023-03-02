import { useContext, useState } from "react";
import { Creature } from "../5etools";
import { CreatureContext, MobsContext } from "../contexts";
import { clampInt } from "../lib";

// import "./MobsSelector.css"

export type Mob = { creatureName: string; mobSize: number };

export const MobsSelector = () => {
  const [filterQuery, setFilterQuery] = useState("");
  const creatures = useContext(CreatureContext);
  const [mobs, setMobs] = useContext(MobsContext);
  const filteredCreatures = creatures.filter((creature) =>
    creature.name.toLowerCase().includes(filterQuery)
  );

  const incrementMob = (creature: Creature) => {
    setMobs((prevMobs) => {
      return {
        ...prevMobs,
        [creature.id]: {
          creatureName: creature.name,
          mobSize: !!prevMobs[creature.id]
            ? clampInt(prevMobs[creature.id].mobSize + 1)
            : 1,
        },
      };
    });
  };

  const filterCreatureNames = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilterQuery(e.target.value);

  return (
    <div className="mobs-selector">
      <input
        type="text"
        placeholder="enter creature name"
        value={filterQuery}
        onChange={filterCreatureNames}
      />
      <div className="mobs-list">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>name</th>
              <th>cr</th>
            </tr>
          </thead>
          <tbody>
            {filteredCreatures.map((creature) => {
              return (
                <tr key={`${creature.name}-${creature.cr}-${creature.id}`}>
                  <td>
                    <button onClick={() => incrementMob(creature)}>+</button>
                  </td>
                  <td>{creature.name}</td>
                  <td>{creature.cr}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
