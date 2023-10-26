"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateCainoModal } from "@/hooks/use-create-caino-modal";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, HomeIcon, PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const CasinoSwitcher = ({ className, casinos = [] }) => {
  const casinoModal = useCreateCainoModal();
  const params = useParams();
  const router = useRouter();

  const formatedCasino = casinos.map((casino) => ({
    label: casino.name,
    value: casino.id,
  }));

  const currentCasino = formatedCasino.find(
    (casino) => casino.label === params.casinoName
  );

  const [open, setOpen] = useState(false);

  const onCasinoSelect = (casino) => {
    setOpen(false);
    router.push(`/${casino.label}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a casino"
          className={cn("w-[300px] justify-between capitalize", className)}
        >
          <HomeIcon className="h-4 w-4 mr-4" />
          <div className="whitespace-nowrap text-ellipsis overflow-hidden">
            Current Casino: {params.casinoName}
          </div>
          <ChevronsUpDown className="ml-4 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search casino..." />
            <CommandEmpty>No casino found.</CommandEmpty>
            <CommandGroup heading="Casinos">
              {formatedCasino.map((casino) => (
                <CommandItem
                  key={casino.value}
                  onSelect={() => onCasinoSelect(casino)}
                  className="text-sm"
                >
                  <HomeIcon className="h-4 w-4 mr-4" />
                  <div className="whitespace-nowrap text-ellipsis overflow-hidden capitalize">
                    {casino.label}
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentCasino?.label === casino.label
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  casinoModal.onOpen();
                }}
              >
                <PlusCircle className="mr-4 h-4 w-4" />
                Create Casino
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CasinoSwitcher;
