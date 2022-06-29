type Props = {
    title: string;
    children: JSX.Element;
}

export default function Tab({ children }: Props) {
    return <div>{children}</div>
}