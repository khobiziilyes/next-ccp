"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Trash2 } from "lucide-react";
import { calcCcpKey } from "@/lib/ccp/calc-ccp-key";
import { calcCcpRib, calcFormattedCcpRib } from "@/lib/ccp/calc-ccp-rib";
import { calcCcpRip } from "@/lib/ccp/calc-ccp-rip";
import { ScrollArea } from "@/components/ui/scroll-area";

const SAVED_KEY = "SAVED";

interface SavedNumber {
  number: string;
  name: string;
}

function getStorageSaved(): SavedNumber[] {
  const saved = localStorage.getItem(SAVED_KEY);
  if (saved) return JSON.parse(saved) as SavedNumber[];

  return [];
}

function setStorageSaved(saved: SavedNumber[]) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
}

export default function HomePage() {
  const { toast } = useToast();

  const [saved, setSaved] = useState<SavedNumber[]>([]);
  useEffect(() => setSaved(getStorageSaved()), []);
  useEffect(() => setStorageSaved(saved), [saved]);

  const [inputName, setInputName] = useState<string>("");

  const [inputNumber, setInputNumber] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [rip, setRip] = useState<string>("");
  const [rib, setRib] = useState<string>("");
  const [formattedRib, setFormattedRib] = useState<string>("");

  const calculatedValues = [key, rip, rib, formattedRib];

  useEffect(() => {
    if (!inputNumber) {
      setKey("");
      setRip("");
      setRib("");
      setFormattedRib("");

      return;
    }

    setKey(calcCcpKey(inputNumber));
    setRip(calcCcpRip(inputNumber));
    setRib(calcCcpRib(inputNumber));
    setFormattedRib(calcFormattedCcpRib(inputNumber));
  }, [inputNumber]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();

      if (!isNaN(Number(text))) {
        setInputNumber(text);
      } else {
        toast({
          title: "Invalid input",
          description: "Clipboard content is not a valid number.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Paste failed",
        description: "Unable to read from clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = (value: string) => {
    void navigator.clipboard.writeText(value);

    toast({
      title: "Copied!",
      description: `${value} has been copied to clipboard.`,
    });
  };

  const handleSaveCurrent = () => {
    // TODO: Should handle already saved numbers.

    const newSaved = [
      ...saved,
      {
        name: inputName,
        number: inputNumber,
      } satisfies SavedNumber,
    ];

    setSaved(newSaved);

    toast({
      title: "Number saved",
      description: `${inputNumber} (${inputName}) has been added to saved numbers.`,
    });

    setInputName("");
  };

  const handleDelete = (index: number) => {
    const newSaved = saved.filter((_, i) => i !== index);

    setSaved(newSaved);

    toast({
      title: "Number deleted",
      description: "The number has been removed.",
    });
  };

  return (
    <main className="container mx-auto flex-grow p-4">
      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-3">
        <Card className={cn("col-span-1", !saved.length && "xl:col-start-2")}>
          <CardHeader>
            <CardTitle>Calculator</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="mb-4 flex">
              <Input
                type="number"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                placeholder="Enter a ccp"
                className="mr-2"
              />

              <Button onClick={handlePaste}>Paste</Button>
            </div>

            {["Key", "RIP", "RIB", "Formatted RIB"].map((label, index) => (
              <div key={label} className="mb-2 flex">
                <Input
                  value={calculatedValues[index]}
                  readOnly
                  disabled
                  className="mr-2"
                  placeholder={label}
                />

                <Button
                  onClick={() => handleCopy(calculatedValues[index]!)}
                  disabled={!calculatedValues[index]}
                >
                  Copy
                </Button>
              </div>
            ))}
          </CardContent>

          <CardFooter className="flex flex-col">
            <div className="mb-2 flex">
              <Input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Enter a name for this number"
                className="mr-2"
              />

              <Button
                onClick={handleSaveCurrent}
                disabled={!inputNumber || !inputName}
              >
                Save Number
              </Button>
            </div>
          </CardFooter>
        </Card>

        <SavedNumbersCard
          saved={saved}
          setInput={setInputNumber}
          handleDelete={handleDelete}
        />
      </div>
    </main>
  );
}

function SavedNumbersCard({
  saved,
  setInput,
  handleDelete,
}: {
  saved: SavedNumber[];

  setInput: (_: string) => void;
  handleDelete: (_: number) => void;
}) {
  if (!saved.length) return null;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Saved CCPs</CardTitle>
      </CardHeader>

      <CardContent>
        {/* ! FIXME */}
        <ScrollArea type="always" className="flex-1">
          <ul className="space-y-2">
            {saved.map((saved, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-md bg-secondary p-2"
              >
                <Button
                  variant="link"
                  onClick={() => setInput(saved.number)}
                  className="text-left text-primary hover:underline"
                >
                  <span className="text-sm text-muted-foreground">
                    {saved.name}
                  </span>

                  {saved.number}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(index)}
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
