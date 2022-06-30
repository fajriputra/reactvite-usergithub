export default function Input(props) {
  const {
    name,
    value,
    onFocus,
    placeholder,
    onChange,
    type,
    isAllRounded,
    onSearch,
    ...other
  } = props;

  return (
    <div className="relative">
      <input
        className={`outline-none focus:outline-none border-gray-300 focus:shadow-none focus:ring-0 focus:border-gray-500 text-sm text-gray-400 caret-red-300 placeholder:text-gray-300 placeholder:focus:text-gray-500
         w-full ${isAllRounded ? "rounded-t" : "rounded"}`}
        autoComplete="off"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onFocus={onFocus}
        onChange={onChange}
        {...other}
      />
      <button
        onClick={onSearch}
        className="rounded-r bg-gray-500 text-sm px-2 text-white absolute top-0 overflow-auto right-0 bottom-0 z-10"
      >
        Search
      </button>
    </div>
  );
}

Input.defaultProps = {
  type: "text",
};
