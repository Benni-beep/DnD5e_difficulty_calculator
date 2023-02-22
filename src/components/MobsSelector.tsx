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

  const decrementMob = (creature: Creature): void => {
    setMobs((prevMobs) => {
      const { [creature.id]: mob, ...rest } = prevMobs;
      if (mob) {
        if (mob.mobSize === 1) {
          return rest;
        } else {
          return {
            ...rest,
            [creature.id]: {
              creatureName: creature.name,
              mobSize: mob.mobSize - 1,
            },
          };
        }
      }
      return prevMobs;
    });
  };

  const filterCreatureNames = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilterQuery(e.target.value);

  return (
    <div className="mobs-selector">
      <div>mobs: {JSON.stringify(mobs)}</div>
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
              <th>in-/decrease mob size</th>
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
                    <button onClick={() => decrementMob(creature)}>-</button>
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
