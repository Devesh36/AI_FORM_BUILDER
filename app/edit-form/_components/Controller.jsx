import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Controller = ({selectedTheme}) => {
  return (
    <div>
      <Select onValueChange={(value) => selectedTheme(value)}>
        <SelectTrigger className="w-full  ">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="system">System</SelectItem>  
        </SelectContent>
      </Select>
    </div>
  );
};

export default Controller;
