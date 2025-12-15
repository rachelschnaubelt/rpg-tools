type Props = {
    children?: React.ReactNode,
    value: string,
    isChecked?: boolean,
    onChange: () => void
}

export default function Checkbox({value, children, onChange, isChecked = false }: Props) {

    return (
        <span>
            <input 
                type="checkbox" 
                id={value} 
                name={value} 
                value={value} 
                checked={isChecked} 
                onChange={onChange} />
            <label htmlFor={value}>{children}</label>
        </span>
    )
}