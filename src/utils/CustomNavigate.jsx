import { useNavigate } from "react-router-dom";

export let globalNavigate;

export const CustomNavigate = () => {
  globalNavigate = useNavigate();
  return null;
};
