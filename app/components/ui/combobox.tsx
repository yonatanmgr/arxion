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
          className={cn(
            "h-12 w-full justify-between rounded-lg border border-zinc-300 px-4 font-mono text-base hover:bg-zinc-100 sm:w-[200px]",
            "transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
          )}
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
        className={cn(
          "w-[calc(100dvw-30px)] border-zinc-300 p-0 text-base sm:w-fit",
          "dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50",
        )}
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
                      value === option.value ? "opacity-100" : "opacity-0",
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

const GroupedCombobox = ({
  schema,
  value,
  onChange,
}: {
  schema: {
    label: string;
    options: Option[];
  }[];
  value: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="grow">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-12 w-full justify-between rounded-lg border border-zinc-300 px-4 font-mono text-base hover:bg-zinc-100 sm:w-[200px]",
            "transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
          )}
        >
          <span className="truncate">
            {value
              ? schema
                  .flatMap((group) => group.options)
                  .find((option) => option.value === value)?.label
              : "Select subject..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-[calc(100dvw-30px)] border-zinc-300 p-0 text-base sm:w-fit",
          "dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50",
        )}
        align="end"
      >
        <Command>
          <CommandInput
            className="font-mono"
            placeholder="Search subjects..."
          />
          <CommandEmpty>No subject found.</CommandEmpty>
          <CommandList>
            {schema.map((group) => (
              <CommandGroup
                heading={group.label}
                key={group.label}
                className="font-mono"
              >
                {group.options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    className="font-mono dark:text-zinc-50"
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 min-w-4",
                        value === option.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option ? option.label : "Select subject..."}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { GroupedCombobox };
