import {
  Merriweather,
  Poppins,
  Bungee,
  Bungee_Inline,
  Bungee_Outline,
  Bungee_Shade,
  Bungee_Spice,
  Anton,
  Permanent_Marker,
  Lobster,
  Oswald,
  Pacifico,
  Raleway,
  Chewy,
  Shadows_Into_Light_Two,
  Abril_Fatface,
  Fredoka,
  Playfair_Display,
  Alfa_Slab_One,
  Caveat,
  Press_Start_2P,
  Unica_One,
  Delius,
  Fredericka_the_Great,
  Monoton,
  Rubik_Mono_One,
  Rubik_Bubbles,
  Rubik_Dirt,
  Rubik_Glitch,
  Rubik_Glitch_Pop,
  Rubik_Scribble,
  Rubik_Doodle_Shadow,
  Rubik_Iso,
  Rubik_Wet_Paint,
  Rubik_Vinyl,
  Rubik_80s_Fade,
  Rubik_Puddles,
  Rubik_Burned,
  Zilla_Slab,
  Zilla_Slab_Highlight,
} from "next/font/google";

const MerriweatherFont = Merriweather({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const PoppinsFont = Poppins({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const BungeeFont = Bungee({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const BungeeInlineFont = Bungee_Inline({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const BungeeOutlineFont = Bungee_Outline({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const BungeeShadeFont = Bungee_Shade({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// const BungeeSpiceFont = Bungee_Spice({
//   subsets: ["latin"],
//   weight: "400",
// display: 'swap',
// });

const AntonFont = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const PermanentMarkerFont = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const LobsterFont = Lobster({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const OswaldFont = Oswald({
  subsets: ["latin"],
});

const PacificoFont = Pacifico({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const RalewayFont = Raleway({
  subsets: ["latin"],
});

const ChewyFont = Chewy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const ShadowsIntoLightTwoFont = Shadows_Into_Light_Two({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const AbrilFatfaceFont = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const FredokaFont = Fredoka({
  subsets: ["latin"],
});

const PlayfairDisplayFont = Playfair_Display({
  subsets: ["latin"],
});

const AlfaSlabOneFont = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const CaveatFont = Caveat({
  subsets: ["latin"],
});

const PressStart2PFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const UnicaOneFont = Unica_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const DeliusFont = Delius({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const FrederickaTheGreatFont = Fredericka_the_Great({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const MonotonFont = Monoton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const RubikMonoOneFont = Rubik_Mono_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const RubikBubblesFont = Rubik_Bubbles({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const RubikDirtFont = Rubik_Dirt({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const RubikGlitchFont = Rubik_Glitch({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// const RubikGlitchPopFont = Rubik_Glitch_Pop({
//   subsets: ["latin"],
//   weight: "400",
// display: 'swap',
// });

// const RubikScribbleFont = Rubik_Scribble({
//   subsets: ["latin"],
//   weight: "400",
// display: 'swap',
// });

// const RubikDoodleShadowFont = Rubik_Doodle_Shadow({
//   subsets: ["latin"],
//   weight: "400",
// display: 'swap',
// });

const RubikIsoFont = Rubik_Iso({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const RubikWetPaintFont = Rubik_Wet_Paint({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const RubikVinylFont = Rubik_Vinyl({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const Rubik80sFadeFont = Rubik_80s_Fade({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const RubikPuddlesFont = Rubik_Puddles({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const RubikBurnedFont = Rubik_Burned({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const ZillaSlabFont = Zilla_Slab({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const ZillaSlabHighlightFont = Zilla_Slab_Highlight({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const fonts = {
  merriweatherFont: {
    name: "Merriweather",
    font: MerriweatherFont,
    value: "merriweatherFont",
  },
  poppinsFont: {
    name: "Poppins",
    font: PoppinsFont,
    value: "poppinsFont",
  },
  bungeeFont: {
    name: "Bungee",
    font: BungeeFont,
    value: "bungeeFont",
  },
  bungeeInlineFont: {
    name: "Bungee Inline",
    font: BungeeInlineFont,
    value: "bungeeInlineFont",
  },
  bungeeOutlineFont: {
    name: "Bungee Outline",
    font: BungeeOutlineFont,
    value: "bungeeOutlineFont",
  },
  bungeeShadeFont: {
    name: "Bungee Shade",
    font: BungeeShadeFont,
    value: "bungeeShadeFont",
  },
  // bungeeSpiceFont: {
  //   name: "Bungee Spice",
  //   font: BungeeSpiceFont,
  //   value: "bungeeSpiceFont",
  // },
  antonFont: {
    name: "Anton",
    font: AntonFont,
    value: "antonFont",
  },
  permanentMarkerFont: {
    name: "Permanent Marker",
    font: PermanentMarkerFont,
    value: "permanentMarkerFont",
  },
  lobsterFont: {
    name: "Lobster",
    font: LobsterFont,
    value: "lobsterFont",
  },
  oswaldFont: {
    name: "Oswald",
    font: OswaldFont,
    value: "oswaldFont",
  },
  pacificoFont: {
    name: "Pacifico",
    font: PacificoFont,
    value: "pacificoFont",
  },
  ralewayFont: {
    name: "Raleway",
    font: RalewayFont,
    value: "ralewayFont",
  },
  chewyFont: {
    name: "Chewy",
    font: ChewyFont,
    value: "chewyFont",
  },
  shadowsIntoLightTwoFont: {
    name: "Shadows Into Light Two",
    font: ShadowsIntoLightTwoFont,
    value: "shadowsIntoLightTwoFont",
  },
  abrilFatfaceFont: {
    name: "Abril Fatface",
    font: AbrilFatfaceFont,
    value: "abrilFatfaceFont",
  },
  fredokaFont: {
    name: "Fredoka",
    font: FredokaFont,
    value: "fredokaFont",
  },
  playfairDisplayFont: {
    name: "Playfair Display",
    font: PlayfairDisplayFont,
    value: "playfairDisplayFont",
  },
  alfaSlabOneFont: {
    name: "Alfa Slab One",
    font: AlfaSlabOneFont,
    value: "alfaSlabOneFont",
  },
  caveatFont: {
    name: "Caveat",
    font: CaveatFont,
    value: "caveatFont",
  },
  pressStart2PFont: {
    name: "Press Start 2P",
    font: PressStart2PFont,
    value: "pressStart2PFont",
  },
  unicaOneFont: {
    name: "Unica One",
    font: UnicaOneFont,
    value: "unicaOneFont",
  },
  deliusFont: {
    name: "Delius",
    font: DeliusFont,
    value: "deliusFont",
  },
  frederickaTheGreatFont: {
    name: "Fredericka the Great",
    font: FrederickaTheGreatFont,
    value: "frederickaTheGreatFont",
  },
  monotonFont: {
    name: "Monoton",
    font: MonotonFont,
    value: "monotonFont",
  },
  rubikMonoOneFont: {
    name: "Rubik Mono One",
    font: RubikMonoOneFont,
    value: "rubikMonoOneFont",
  },
  rubikBubblesFont: {
    name: "Rubik Bubbles",
    font: RubikBubblesFont,
    value: "rubikBubblesFont",
  },
  rubikDirtFont: {
    name: "Rubik Dirt",
    font: RubikDirtFont,
    value: "rubikDirtFont",
  },
  rubikGlitchFont: {
    name: "Rubik Glitch",
    font: RubikGlitchFont,
    value: "rubikGlitchFont",
  },
  // rubikGlitchPopFont: {
  //   name: "Rubik Glitch Pop",
  //   font: RubikGlitchPopFont,
  //   value: "rubikGlitchPopFont",
  // },
  // rubikScribbleFont: {
  //   name: "Rubik Scribble",
  //   font: RubikScribbleFont,
  //   value: "rubikScribbleFont",
  // },
  // rubikDoodleShadowFont: {
  //   name: "Rubik Doodle Shadow",
  //   font: RubikDoodleShadowFont,
  //   value: "rubikDoodleShadowFont",
  // },
  rubikIsoFont: {
    name: "Rubik Iso",
    font: RubikIsoFont,
    value: "rubikIsoFont",
  },
  rubikWetPaintFont: {
    name: "Rubik Wet Paint",
    font: RubikWetPaintFont,
    value: "rubikWetPaintFont",
  },
  rubikVinylFont: {
    name: "Rubik Vinyl",
    font: RubikVinylFont,
    value: "rubikVinylFont",
  },
  rubik80sFadeFont: {
    name: "Rubik 80s Fade",
    font: Rubik80sFadeFont,
    value: "rubik80sFadeFont",
  },
  rubikPuddlesFont: {
    name: "Rubik Puddles",
    font: RubikPuddlesFont,
    value: "rubikPuddlesFont",
  },
  rubikBurnedFont: {
    name: "Rubik Burned",
    font: RubikBurnedFont,
    value: "rubikBurnedFont",
  },
  zillaSlabFont: {
    name: "Zilla Slab",
    font: ZillaSlabFont,
    value: "zillaSlabFont",
  },
  zillaSlabHighlightFont: {
    name: "Zilla Slab Highlight",
    font: ZillaSlabHighlightFont,
    value: "zillaSlabHighlightFont",
  },
};
