export type DailyPlaylist = {
  title: string;
  microcopy: string;
  musicDirection: string;
  mixcloudUrl: string;
};

export const dailyPlaylists: DailyPlaylist[] = [
  {
    title: "Monday Blues",
    microcopy: "Something for easing into the week.",
    musicDirection: "Soul mix",
    mixcloudUrl: "https://www.mixcloud.com/DJVadim/soul-in-the-bass-mixtape/",
  },
  {
    title: "Tuesday Focus",
    microcopy: "Headphones on. Everything else off.",
    musicDirection: "Ambient · Electronic · Instrumental",
    mixcloudUrl: "https://www.mixcloud.com/richardchartier/between-two-points-may-2022-radio-show-by-richard-chartier-for-dublab/",
  },
  {
    title: "Midweek Frequencies",
    microcopy: "Something a little less predictable.",
    musicDirection: "Alternative · Experimental · Electronic",
    mixcloudUrl: "https://www.mixcloud.com/TheRansomNote/estelle-birch-the-wednesday-alternative-mix/",
  },
  {
    title: "From the Archives",
    microcopy: "Some things age better than software.",
    musicDirection: "Old favourites · Rediscoveries",
    mixcloudUrl: "https://www.mixcloud.com/satoshi_tomiie/wax-digging-3/",
  },
  {
    title: "Friday Unwind",
    microcopy: "The week can wait.",
    musicDirection: "Soul · Downtempo",
    mixcloudUrl: "https://www.mixcloud.com/jboogie/rooftop-sessions-vol-3/",
  },
  {
    title: "Saturday Night Drive",
    microcopy: "Best played after dark.",
    musicDirection: "Electronic · Synth · Indie",
    mixcloudUrl: "https://www.mixcloud.com/djturmix/cosmic-exploration/",
  },
  {
    title: "Sunday Reset",
    microcopy: "Music for doing absolutely nothing urgent.",
    musicDirection: "Ambient · Acoustic",
    mixcloudUrl: "https://www.mixcloud.com/lowlight/psalms-lullabies/",
  },
];
