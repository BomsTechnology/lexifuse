export interface LevelProps {
  id: string;
  name: string;
  level: number;
  nb_points: number;
  languages: {
    id: string;
    name: string;
    image: string;
    iso_code: string | null;
  } | null;
}
