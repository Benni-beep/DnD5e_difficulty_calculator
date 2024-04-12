// import "./App.css";
import styles from "./Layout.module.css";

import { MobsSelector } from "./components/MobsSelector";
import {
  CreatureContext,
  CreaturesByIdContext,
  MobsContext,
  PartyContext,
} from "./contexts";
import { Difficulty } from "./components/Difficulty";
import { MobsList } from "./components/MobsList";
import { useState, useEffect } from "react";
import { Creature } from "./5etools";
import { CreaturesById, getCreaturesById } from "./domain";
import { getOrUpdateLocalStorage } from "./local-storage";
import { CustomCreature } from "./components/CustomCreature";
import { Party, TParty } from "./components/Party";

export type MobsState = {
  [creatureId: string]: {
    creatureName: string;
    mobSize: number;
    powerLevel: number;
    baseCr: number | null;
  };
};

function App() {
  const [party, setParty] = useState<TParty>({ count: 1, level: 1, customCreature: []});
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [mobs, setMobs] = useState<MobsState>({});
  const [creaturesById, setCreaturesById] = useState<CreaturesById>({});

  useEffect(() => {
    // localStorage.clear();
    getOrUpdateLocalStorage().then((creatures) => {
      setCreatures(creatures);
      const creaturesById = getCreaturesById(creatures);
      setCreaturesById(creaturesById);
    });
  }, []);

  return (
      <CreaturesByIdContext.Provider value={creaturesById}>
        <MobsContext.Provider value={[mobs, setMobs]}>
          <CreatureContext.Provider value={creatures}>
            <PartyContext.Provider value={[party, setParty]}>
              <div className={styles.container}>
                <div className={styles.left}>
                  <MobsSelector />
                </div>
                <div className={styles.right}>
                  <CustomCreature />
                  <MobsList />
                  <Party />
                  <Difficulty />
                </div>
              </div>
            </PartyContext.Provider>
          </CreatureContext.Provider>
        </MobsContext.Provider>
      </CreaturesByIdContext.Provider>
  );
}

export default App;
