import { Edit, Trash } from "lucide-react";
import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import FormUi from "./FormUi";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogTitle, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter,AlertDialogAction, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function FieldEdit({ defaultValue, onUpdate, deleteFiled }) {
  const [label, setLabel] = useState(defaultValue.formLabel);
  const [placeholder, setPlaceholder] = useState(defaultValue.placeholderName);

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger>
          <Edit className=" h-5 w-5 text-gray-500" />
        </PopoverTrigger>
        <PopoverContent>
          <h2>Edit Fields</h2>
          <div>
            <label className="text-xs">Label Name</label>
            <Input
              type="text"
              defaultValue={defaultValue.formLabel}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs">Placeholder Name</label>
            <Input
              type="text"
              defaultValue={defaultValue.placeholderName}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </div>
          <Button
            className="sm bg-primary text-white mt-3 rounded-lg"
            onClick={() =>
              onUpdate({
                label: label,
                placeholder: placeholder,
              })
            }
          >
            Update
          </Button>
        </PopoverContent>
      </Popover>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            <Trash className="h-5 w-5 text-red-500" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>{deleteFiled()}}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default FieldEdit;
