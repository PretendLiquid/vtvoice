import { HoverButtonTransparent } from "../styles/common/Buttons.styled";

type Props = {
    title: string;
    index: number;
    setSelectedTab: (index: number) => void;
    active: boolean;
}

export default function TabTitle({ title, index, setSelectedTab, active }: Props) {
    return (
        <HoverButtonTransparent className={active ? "active" : ""} style={{ height:'30px', width: '90%'}}  onClick={() => setSelectedTab(index)}>{title}</HoverButtonTransparent>
    );
}