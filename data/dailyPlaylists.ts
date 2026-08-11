export type DailyPlaylist = {
  title: string;
  microcopy: string;
  musicDirection: string;
  mixcloudUrl: string;
};

export const dailyPlaylists: DailyPlaylist[] = [
  {
    title: "MONDAY BLUES",
    microcopy: "Something for easing into the week.",
    musicDirection: "Soul mix",
    mixcloudUrl: "https://www.mixcloud.com/Atelierclub/monday-stream-3-by-dj-james-lurk/",
  },
  {
    title: "TUESDAY FOCUS",
    microcopy: "Headphones on. Everything else off.",
    musicDirection: "Ambient · Electronic · Instrumental",
    mixcloudUrl: "https://www.mixcloud.com/AsokaKloofStreet/asoka-live-vol-8-tuesday-night-dj-set-januaryone/",
  },
  {
    title: "MIDWEEK FREQUENCIES",
    microcopy: "Something a little less predictable.",
    musicDirection: "Alternative · Experimental · Electronic",
    mixcloudUrl: "https://www.mixcloud.com/neoBeo/neobeo-%E1%8E%A0ubstation-fusion-festival-2018/",
  },
  {
    title: "FROM THE ARCHIVES",
    microcopy: "Some things age better than software.",
    musicDirection: "Old favourites · Rediscoveries",
    mixcloudUrl: "https://www.mixcloud.com/graemepark/this-is-graeme-park-sub-club-glasgow-19nov15-live-dj-mix/",
  },
  {
    title: "FRIDAY UNWIND",
    microcopy: "The week can wait.",
    musicDirection: "Soul · Downtempo",
    mixcloudUrl: "https://www.mixcloud.com/djxtcnet/friday-nite-ride-001/",
  },
  {
    title: "SATURDAY NIGHT DRIVE",
    microcopy: "Best played after dark.",
    musicDirection: "Electronic · Synth · Indie",
    mixcloudUrl: "https://www.mixcloud.com/DJGixxy/saturday-mix/",
  },
  {
    title: "SUNDAY RESET",
    microcopy: "Music for doing absolutely nothing urgent.",
    musicDirection: "Ambient · Acoustic",
    mixcloudUrl: "https://www.mixcloud.com/stevegoddard7758/love-on-the-leas-2-opening-set-sunday/",
  },
];
