export interface GameProps {
  id: string;
  level: number;
  nb_points: number;
  users: {
    id: string;
    username: string | null;
    email: string | null;
    type: string;
  } | null;
  languages: {
    id: string;
    name: string;
    image: string;
    iso_code: string | null;
  } | null;
}
