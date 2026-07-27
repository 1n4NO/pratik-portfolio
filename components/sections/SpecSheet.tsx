import { profile } from "@/data/profile";
import { MetaStack } from "@/components/ui/MetaStack";

export function SpecSheet() {
  return <MetaStack items={profile.specSheet} />;
}
