import type { ReactElement } from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { AlertCircleIcon } from "lucide-react";

interface MessageProps {
  title: string;
  description?: string;
  icon?: ReactElement<typeof AlertCircleIcon>;
  type: "error" | "default";
}

export const Message = ({ title, description, icon, type }: MessageProps) => {
  return (
    <Alert variant={type === "default" ? "default" : "destructive"}>
      {icon && <>{icon}</>}
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};
