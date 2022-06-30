import { useCallback, useEffect, useRef, useState } from "react";
import { useEscapePress, useClickOutside, useDebounce, useForm } from "@/hooks";

import { getUserRepos, getUsers } from "./services";

import Input from "@/components/Input";
import Autocomplete from "@/components/Autocomplete";
import Modal from "@/components/Modal";
import Card from "@/components/Card";

import Pagination from "react-paginate";

const per_page = 5;

const initialState = {
  search: "",
  username: "",
};

function App() {
  const inputRef = useRef(null);

  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [isSuggestions, setIsSuggestions] = useState(false);
  const [page, setPage] = useState(1);
  const [detailRepos, setDetailRepos] = useState({});
  const { values, setValues, handleChange } = useForm(initialState);

  const { search, username } = values;

  const debounced = useDebounce(search);

  const handleFocused = () => setIsSuggestions(true);
  const handleHideSuggesstion = () => setIsSuggestions(false);
  const handleChooseUser = (data) => {
    setValues({ ...values, search: data });
    setIsSuggestions(false);
  };

  useClickOutside(inputRef, handleHideSuggesstion);
  useEscapePress(handleHideSuggesstion);

  const getUsersAPI = useCallback(async () => {
    const response = await getUsers();
    if (response.error) console.log(response.message);
    else setUsers(response.data);
  }, []);

  const getReposAPI = useCallback(async (value) => {
    const response = await getUserRepos(value);
    // console.log(response);
    if (response.error) console.log(response.message);
    else setRepositories(response.data);
  }, []);

  const onSearchRepos = () => {
    getReposAPI({ username, page, per_page });
    setValues({ ...values, username: search });
  };

  const handlePagination = (e) => {
    const selected = e.selected + 1;
    setPage(selected);
  };

  const handleModal = (data) => {
    setShow(true);
    setDetailRepos({ ...data });
  };

  useEffect(() => {
    if (username && page) {
      getReposAPI({ username, page, per_page });
    }
  }, [username, page]);

  useEffect(() => {
    const filtered = users?.filter((user) =>
      user.login.toLowerCase().includes(debounced.toLowerCase())
    );
    setUsers(filtered);
  }, [debounced]);

  useEffect(() => {
    if (search === "") {
      setValues({ ...values, username: "" });
      setRepositories([]);
    } else if (repositories.length > 0) {
      setValues({ ...values, username: "" });
    }
  }, [search]);

  useEffect(() => {
    if (!show) {
      setDetailRepos({});
    }
  }, [show]);

  useEffect(() => {
    if (!debounced) {
      getUsersAPI();
    }
  }, [debounced]);

  return (
    <>
      <Modal show={show} setShow={setShow} data={detailRepos} />
      <section className="mt-10">
        <div className="w-1/3 mx-auto mb-5" ref={inputRef}>
          <Input
            placeholder="Search username"
            name="search"
            value={search}
            isAllRounded={isSuggestions}
            onChange={handleChange}
            onFocus={handleFocused}
            onSearch={onSearchRepos}
          />
          <Autocomplete
            lists={users}
            isSuggest={isSuggestions}
            onClick={handleChooseUser}
          />
        </div>
        <div className="flex items-center justify-center flex-wrap gap-3">
          {repositories.length === 0 ? (
            <span>Silahkan cari users untuk melihat repositories</span>
          ) : (
            repositories.map((repository) => (
              <Card
                data={repository}
                key={repository.id}
                onClick={() => handleModal(repository)}
              />
            ))
          )}
        </div>
        {repositories.length > 0 ? (
          <Pagination
            activeClassName="!bg-gray-300 !text-gray-500 hover:!text-white hover:!bg-gray-400"
            breakLabel="..."
            breakClassName="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            onPageChange={handlePagination}
            previousClassName="relative flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            nextClassName="relative flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            className="relative z-0 flex items-center justify-center mt-10 rounded-md -space-x-px"
            pageCount={Math.ceil(repositories?.length)}
            pageClassName="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          />
        ) : null}
      </section>
    </>
  );
}

export default App;
