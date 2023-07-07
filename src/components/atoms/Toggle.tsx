import React from "react";

type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
};

export default function Toggle({ toggled, onToggle, onIcon, offIcon }: Props) {
  return <button aria-label="토글 버튼" onClick={() => onToggle(toggled)}>{toggled ? onIcon : offIcon}</button>;
}
