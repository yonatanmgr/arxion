import { Check, ChevronsUpDown } from "lucide-react";

import { NextComponentType } from "next";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/app/utils/common";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/app/components/ui/command";
import { Button } from "./button";

interface Option {
  value: string;
  label: string;
}

// make a interface called ComboboxSchema that extends Option[]
export type ComboboxSchema = Option[];

interface ComboboxProps {
  schema: Option[];
  value: string;
  onChange: (value: string) => void;
}

export const Combobox: NextComponentType<{}, {}, ComboboxProps> = ({
  schema,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="grow">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-12 text-base sm:w-[200px] hover:bg-zinc-100 justify-between font-mono border border-zinc-300 rounded-lg px-4"
        >
          <span className="truncate">
            {value
              ? schema.find((option) => option.value === value)?.label
              : "Select subject..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="sm:w-fit text-base p-0 border-zinc-300"
        align="end"
      >
        <Command>
          <CommandInput
            className="font-mono"
            placeholder="Search subjects..."
          />
          <CommandEmpty>No subject found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {schema.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  className="font-mono"
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 min-w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
