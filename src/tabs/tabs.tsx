import { useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Base2LightDiv } from "../styles/common/Divs.styled";
import { SideBar } from "../styles/common/SideBar.styled";
import { ActionHeader } from "../styles/common/Text.styled";
import TabTitle from "./tabTitle";

type Props = {
    title?: string;
    children: JSX.Element[];
}

export default function Tabs({ children, title }: Props) {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div style={{ height:'100%', width:'100%', display: 'flex'}}>
            <SideBar style={{ width: '150px', display: 'flex', flexDirection: 'column'}}>
                <ActionHeader style={{ textAlign: 'left', paddingLeft: '10px', marginBottom: '0px'}}>{title}</ActionHeader>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', gap: '3px' }}>
                    {children.map((item, index) => (
                        <TabTitle
                            key={index}
                            title={item.props.title}
                            index={index}
                            setSelectedTab={setSelectedTab}
                            active={index === selectedTab}
                        />
                    ))}
                </div>
            </SideBar>
            <div style={{flex: '1'}}>
                <Base2LightDiv style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}}>
                    <ActionHeader inverted={true} style={{ textAlign: 'left', paddingLeft: '10px', marginBottom: '0px'}}>{`${children[selectedTab].props.title}`.toUpperCase()}</ActionHeader>
                    {children[selectedTab]}
                </Base2LightDiv>
            </div>
        </div>
    );
}