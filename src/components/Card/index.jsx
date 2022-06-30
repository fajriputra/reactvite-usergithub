import CloseButton from "@/components/Modal/Close";
import Pilled from "@/components/Pilled";
import { timeAgo } from "@/utils/timeAgo";

export default function Card(props) {
  const { isModal, onClick, onClose, data } = props;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <h5 className="block">#{data.id}</h5>{" "}
          {isModal ? (
            <span className="text-sm">Created {timeAgo(data.created_at)}</span>
          ) : null}
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="font-bold text-xl">
            <a
              className="underline"
              href={data.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.name}
            </a>
          </div>
          {isModal ? <CloseButton onClose={onClose} /> : null}
        </div>
        {isModal ? (
          <p className="text-gray-700 text-base">{data.description}</p>
        ) : null}
      </div>
      <div className="px-6 pb-2">
        <Pilled title={`#${data.forks} forks`} />
        <Pilled title={`#${data.open_issues} issues`} />
        <Pilled title={`#${data.watchers} watchers`} />
      </div>
      <div className="px-6 pb-2">
        {data.language ? <Pilled title={data.language} /> : null}
      </div>
      {isModal ? (
        <div className="px-6 pb-4 text-end">
          <span className="text-sm text-end">
            Updated {timeAgo(data.updated_at)}
          </span>
        </div>
      ) : null}

      {!isModal ? (
        <div className="text-center pb-4">
          <button
            className="bg-gray-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
            onClick={onClick}
          >
            More details
          </button>
        </div>
      ) : null}
    </div>
  );
}
