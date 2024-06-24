export interface CommonButtonI {
  type: "button" | "submit" | "reset";
  children: React.ReactNode | string;
  extraClass?: string;
  hasUniqueColor?: string;
  onClickHandler?: () => void;
}
