import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice.js";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Icon = ({ children, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-4 h-4 ${className}`}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);

  const formatIndianDateTime = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const iconBtnClass =
    "w-10 h-10 border border-white rounded-md flex items-center justify-center shrink-0 p-0 bg-transparent text-white";

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare() {
    // i want to share the url of the paste in clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  }

  return (
    <div>
      <input
        className="p-2 border rounded-2xl mt-5 w-[600px] "
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                className="border gap-2 flex flex-row max-w-[130%] rounded-md justify-between"
                key={paste?._id}
              >
                <div className="min-w-[40%] min-h-[100px] flex flex-col justify-evenly">
                  <div>{paste.title}</div>
                  <div>{paste.content}</div>
                </div>
                <div className="flex flex-col gap-4 justify-center items-center">
                  <div className="flex flex-row flex-wrap gap-2 justify-center mr-3">
                    <NavLink
                      to={`/?pasteId=${paste?._id}`}
                      className={iconBtnClass}
                      aria-label="Edit"
                      title="Edit"
                    >
                      <Icon>
                        <path
                          d="M4 20h4l10.5-10.5a1.5 1.5 0 0 0 0-2.12L16.62 5.5a1.5 1.5 0 0 0-2.12 0L4 16v4Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.5 6.5 17.5 10.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </Icon>
                    </NavLink>

                    <NavLink
                      to={`/pastes/${paste?._id}`}
                      className={iconBtnClass}
                      aria-label="View"
                      title="View"
                    >
                      <Icon>
                        <path
                          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </Icon>
                    </NavLink>

                    <button
                      type="button"
                      className={iconBtnClass}
                      aria-label="Delete"
                      title="Delete"
                      onClick={() => handleDelete(paste?._id)}
                    >
                      <Icon>
                        <path
                          d="M4 7h16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 11v6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M14 11v6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M6 7l1 14h10l1-14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 7V4h6v3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </Icon>
                    </button>

                    <button
                      type="button"
                      className={iconBtnClass}
                      aria-label="Copy"
                      title="Copy"
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("copied to clipboard");
                      }}
                    >
                      <Icon>
                        <path
                          d="M9 9h10v12H9V9Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </Icon>
                    </button>

                    <button
                      type="button"
                      className={iconBtnClass}
                      aria-label="Share"
                      title="Share"
                      onClick={handleShare}
                    >
                      <Icon>
                        <path
                          d="M14 3h7v7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M21 3 10 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M14 10V7H7a4 4 0 0 0-4 4v10h10a4 4 0 0 0 4-4v-7h-3Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </Icon>
                    </button>
                  </div>
                  <div>{formatIndianDateTime(paste.createdAt)}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
