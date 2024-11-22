import { useRouter } from 'expo-router';
import { usePokedex } from "@/app/(authScreen)/_layout";
export const changeRoute = (route: string) => {
  const { closePokedex } = usePokedex();
  const router = useRouter();
  closePokedex();
  setTimeout(() => {
    router.push(route);
  }, 600);
};