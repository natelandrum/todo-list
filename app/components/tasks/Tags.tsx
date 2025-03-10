import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LocalTag } from "@/lib/definitions";

export default function Tags({
  localTags,
  setLocalTags,
}: {
  localTags: LocalTag[];
  setLocalTags: React.Dispatch<
    React.SetStateAction<LocalTag[]>
  >;
}) {
  return (
    <div className="mt-6">
      <div className="flex items-center">
        <h3 className="text-md font-semibold text-blue-400">Tags</h3>
        <IconButton
          type="button"
          color="primary"
          aria-label="add tag"
          onClick={() =>
            setLocalTags([
              ...localTags,
               {name: ""},
            ])
          }
          className="mt-2 px-2 py-1 bg-blue-600 text-white rounded"
        >
          <AddIcon />
        </IconButton>
      </div>

      {localTags.length ? (
        <ul className="mt-2 space-y-2">
          {localTags.map((tag, index) => (
            <li key={index} className="flex items-center space-x-3">
              <input
                type="text"
                value={tag.name}
                onChange={(e) => {
                  const updatedTags = [...localTags];
                  updatedTags[index].name = e.target.value;
                  setLocalTags(updatedTags);
                }}
                className="bg-transparent border-b border-gray-600 text-white w-full focus:outline-none"
              />
              <IconButton
                type="button"
                color="error"
                aria-label="remove tag"
                onClick={() => {
                  const updatedTags = [...localTags];
                  updatedTags.splice(index, 1);
                  setLocalTags(updatedTags);
                }}
                className="px-2 py-1 bg-red-600 text-white rounded"
              >
                <RemoveIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-1 text-sm">No tags</p>
      )}
    </div>
  );
}
