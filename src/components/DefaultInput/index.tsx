import styles from "./styles.module.css"

type DefaultInputProps = {
	labelText: string
} & React.ComponentProps<"input">

export function DefaultInput({
	id,
	type,
	labelText,
	...props
}: DefaultInputProps) {
	return (
		<>
			<label htmlFor={id}>{labelText}</label>
			<input className={styles.input} id={id} type={type} {...props} />
		</>
	)
}
