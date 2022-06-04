export const powerlevelByCr: Record<number, number> = {
  0: 1 / 3,
  0.125: 2 / 3,
  0.25: 1,
  0.5: 1.5,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 11,
  6: 13,
  7: 15,
  8: 18,
  9: 21,
  10: 24,
  11: 28,
  12: 32,
  13: 36,
  14: 40,
  15: 44,
  16: 48,
  17: 52,
  18: 56,
  19: 60,
  20: 64,
  21: 76,
  22: 88,
  23: 104,
  24: 120,
  25: 136,
  26: 152,
  27: 168,
  28: 184,
  29: 200,
  30: 216,
};

export const powerlevelByPlayerLevel: Record<number, number> = {
  1: 1,
  2: 1.5,
  3: 2.5,
  4: 3,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 16,
  16: 18,
  17: 20,
  18: 22,
  19: 24,
  20: 26,
};

export const allBestiaryFileNames = [
  "bestiary-ai.json",
  "bestiary-aitfr-dn.json",
  "bestiary-aitfr-fcd.json",
  "bestiary-aitfr-isf.json",
  "bestiary-aitfr-thp.json",
  "bestiary-bgdia.json",
  "bestiary-cm.json",
  "bestiary-cos.json",
  "bestiary-dc.json",
  "bestiary-dip.json",
  "bestiary-dmg.json",
  "bestiary-egw.json",
  "bestiary-erlw.json",
  "bestiary-esk.json",
  "bestiary-ggr.json",
  "bestiary-gos.json",
  "bestiary-hftt.json",
  "bestiary-hol.json",
  "bestiary-hotdq.json",
  "bestiary-idrotf.json",
  "bestiary-imr.json",
  "bestiary-kkw.json",
  "bestiary-llk.json",
  "bestiary-lmop.json",
  "bestiary-lr.json",
  "bestiary-mff.json",
  "bestiary-mm.json",
  "bestiary-mot.json",
  "bestiary-mtf.json",
  "bestiary-oota.json",
  "bestiary-oow.json",
  "bestiary-phb.json",
  "bestiary-pota.json",
  "bestiary-ps-a.json",
  "bestiary-ps-d.json",
  "bestiary-ps-i.json",
  "bestiary-ps-k.json",
  "bestiary-ps-x.json",
  "bestiary-ps-z.json",
  "bestiary-rmbre.json",
  "bestiary-rot.json",
  "bestiary-sads.json",
  "bestiary-sdw.json",
  "bestiary-skt.json",
  "bestiary-slw.json",
  "bestiary-tce.json",
  "bestiary-tftyp.json",
  "bestiary-toa.json",
  "bestiary-ttp.json",
  "bestiary-ua-2020smt.json",
  "bestiary-ua-2021do.json",
  "bestiary-ua-2021mos.json",
  "bestiary-ua-20s2.json",
  "bestiary-ua-20s5.json",
  "bestiary-ua-ar.json",
  "bestiary-ua-cdw.json",
  "bestiary-ua-cfv.json",
  "bestiary-vgm.json",
  "bestiary-vrgr.json",
  "bestiary-wbtw.json",
  "bestiary-wdh.json",
  "bestiary-wdmm.json",
  "bestiary-xge.json"
] as const;