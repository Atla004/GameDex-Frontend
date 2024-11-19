import { Link } from 'expo-router';

export default function index() {
  return <Link href="\(authScreen)\(accountScreen)\LoginScreen.tsx" > Go to Auth </Link>;
}