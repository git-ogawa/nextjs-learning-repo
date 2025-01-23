export type SelectBoxProps = {
  defaultValue: string[]
  options: string[]
  onChange: (value: string) => void
}

export default function SelectBox({ defaultValue, options, onChange = () => {} }: SelectBoxProps) {
  return (
    <select
      defaultValue={defaultValue}
      onChange={onChange}
      className="inline-flex items-center rounded-l-lg text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
    >
      {options.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  )
}
