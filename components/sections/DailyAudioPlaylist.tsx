"use client";

import { useEffect, useState } from "react";
import { dailyPlaylists } from "@/data/dailyPlaylists";

export function DailyAudioPlaylist() {
  const [dayIndex, setDayIndex] = useState(0);

  useEffect(() => {
    setDayIndex((new Date().getDay() + 6) % 7);
  }, []);

  const playlist = dailyPlaylists[dayIndex];
  const embedUrl = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&hide_tracklist=1&feed=${encodeURIComponent(playlist.mixcloudUrl)}`;

  return (
    <div className="bg-[#161512] px-6 pb-24 pt-[0.324rem] text-[#f3f1e9] md:px-8 md:pb-32 md:pt-[0.324rem]">
      <h3 className="font-display text-[clamp(2.3rem,4vw,4.8rem)] font-normal leading-none text-[#f3f1e9]">
        {playlist.title}
      </h3>

      <div className="mt-7 overflow-hidden bg-[#161512] md:mt-8">
        <iframe
          title={`${playlist.title} Mixcloud player`}
          src={embedUrl}
          width="100%"
          height="180"
          allow="autoplay"
          loading="lazy"
          className="block border-0"
        />
      </div>
    </div>
  );
}
