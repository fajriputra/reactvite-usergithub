export default function Autocomplete(props) {
  const { lists, onClick, isSuggest } = props;

  return (
    <>
      {isSuggest ? (
        <>
          {lists.length === 0 ? (
            <ul className="border p-2">Username tidak ditemukan</ul>
          ) : (
            <ul className="border max-h-48 overflow-y-auto">
              {lists?.map((list) => (
                <li
                  className="p-2 border-b hover:bg-gray-100"
                  key={list.id}
                  onClick={() => onClick(list.login)}
                >
                  {list.login}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : null}
    </>
  );
}
